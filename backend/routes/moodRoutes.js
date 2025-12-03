import express from "express";
import MoodEntry from "../models/MoodEntry.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/mood
router.post("/", protect, async (req, res) => {
  try {
    const { mood, note, date } = req.body;
    const entry = await MoodEntry.create({
      user: req.user._id,
      mood,
      note,
      date: date || Date.now()
    });
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ message: "Could not save mood entry" });
  }
});

// GET /api/mood
router.get("/", protect, async (req, res) => {
  try {
    const entries = await MoodEntry.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(14); // Last 14 days
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;