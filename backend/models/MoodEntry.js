import mongoose from "mongoose";

const moodEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mood: { type: Number, min: 1, max: 5, required: true },
    note: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("MoodEntry", moodEntrySchema);