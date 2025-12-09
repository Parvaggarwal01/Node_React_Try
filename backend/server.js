import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import aiChatRoutes from "./routes/aiChatRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/mentalhealth")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use("/api/auth", authRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/ai-chat", aiChatRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("../frontend/dist/index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
