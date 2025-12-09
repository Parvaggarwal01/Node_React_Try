import express from "express";
import Resource from "../models/Resource.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const { q, category } = req.query;
    let filter = {};

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { tags: { $in: [new RegExp(q, "i")] } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    const resources = await Resource.find(filter)
      .sort({ createdAt: -1 })
      .populate("createdBy", "name");
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/", protect, requireRole(["counselor"]), async (req, res) => {
  try {
    const resource = await Resource.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(resource);
  } catch (err) {
    res.status(400).json({ message: "Error creating resource" });
  }
});


router.put("/:id", protect, requireRole(["counselor"]), async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(resource);
  } catch (err) {
    res.status(400).json({ message: "Error updating resource" });
  }
});


router.delete("/:id", protect, requireRole(["counselor"]), async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json({ message: "Resource deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting resource" });
  }
});

export default router;
