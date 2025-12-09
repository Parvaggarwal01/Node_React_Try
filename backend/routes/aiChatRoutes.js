import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


const SYSTEM_PROMPT = `You are a compassionate mental health support AI assistant for students in higher education. Your role is to provide:

1. Emotional support and empathetic listening
2. Information about stress management, anxiety, depression, and other mental health topics
3. Coping strategies and wellness techniques
4. Study-life balance advice
5. General mental health resources and guidance

IMPORTANT RESTRICTIONS:
- ONLY answer questions related to mental health, emotional wellbeing, stress, anxiety, depression, self-care, wellness, counseling, and student life challenges
- If asked about topics unrelated to mental health (e.g., coding, math, history, sports, entertainment), politely redirect: "I'm specifically designed to help with mental health and emotional wellbeing questions. For that topic, I'd recommend consulting other resources. Is there anything about your mental health or emotional wellbeing I can help you with?"
- Do NOT provide medical diagnoses or replace professional medical care
- Always encourage seeking professional help for serious concerns
- Be warm, supportive, and non-judgmental
- Keep responses concise (2-4 paragraphs) and actionable
- If someone mentions self-harm or suicide, immediately provide crisis resources

Remember: You're a supportive companion, not a replacement for professional therapy or emergency services.`;

router.post("/", protect, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not configured");
      return res.status(500).json({
        message: "AI service configuration error.",
      });
    }

    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    
    let conversationContext = SYSTEM_PROMPT + "\n\n";

    
    const recentHistory = conversationHistory.slice(-10);
    recentHistory.forEach((msg) => {
      conversationContext += `${msg.role === "user" ? "User" : "Assistant"}: ${
        msg.content
      }\n`;
    });

    conversationContext += `User: ${message}\nAssistant:`;

    
    const result = await model.generateContent(conversationContext);
    const response = await result.response;
    const aiReply = response.text();

    res.json({
      reply: aiReply,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("AI Chat Error Details:", error);

    
    if (error.status === 429) {
      return res.status(429).json({
        message: "The AI is currently busy. Please try again in a minute.",
        error: "Quota Exceeded",
      });
    }

    if (error.message?.includes("API key")) {
      return res.status(500).json({
        message: "Configuration Error: Invalid API key.",
      });
    }

    res.status(500).json({
      message: "Failed to get AI response. Please try again.",
      error: error.message,
    });
  }
});

export default router;
