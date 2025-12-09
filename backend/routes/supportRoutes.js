import express from "express";
import SupportRequest from "../models/SupportRequest.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", protect, async (req, res) => {
  try {
    const supportRequest = await SupportRequest.create({
      ...req.body,
      student: req.user._id,
    });
    res.status(201).json(supportRequest);
  } catch (err) {
    res.status(400).json({ message: "Error creating support request" });
  }
});


router.get("/my", protect, async (req, res) => {
  try {
    const requests = await SupportRequest.find({ student: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/", protect, requireRole(["counselor"]), async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const requests = await SupportRequest.find(filter)
      .sort({ createdAt: -1 })
      .populate("student", "name email");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id", protect, requireRole(["counselor"]), async (req, res) => {
  try {
    const { status, counselorNote } = req.body;
    const supportRequest = await SupportRequest.findByIdAndUpdate(
      req.params.id,
      { status, counselorNote },
      { new: true }
    ).populate("student", "name email");

    if (!supportRequest) {
      return res.status(404).json({ message: "Support request not found" });
    }
    res.json(supportRequest);
  } catch (err) {
    res.status(400).json({ message: "Error updating support request" });
  }
});

export default router;
