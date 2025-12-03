import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true }, // e.g., "Stress", "Sleep"
    description: String,
    link: String,
    tags: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Resource", resourceSchema);