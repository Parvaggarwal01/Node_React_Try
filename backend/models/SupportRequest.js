import mongoose from "mongoose";

const supportRequestSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: { type: String, required: true },
    preferredMode: {
      type: String,
      enum: ["email", "call", "in_person"],
      default: "email",
    },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in_progress", "closed"],
      default: "open",
    },
    counselorNote: String,
  },
  { timestamps: true }
);

export default mongoose.model("SupportRequest", supportRequestSchema);