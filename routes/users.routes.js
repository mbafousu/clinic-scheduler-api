import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { role, email } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (email) filter.email = email.toLowerCase();

    const users = await User.find(filter).sort({ createdAt: -1 });
    res.json(users);
  } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: "Invalid id" });
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    const created = await User.create(req.body);
    res.status(201).json(created);
  } catch (e) { next(e); }
});

router.patch("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: "Invalid id" });

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: "Invalid id" });
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ ok: true, deletedId: deleted._id });
  } catch (e) { next(e); }
});

// Validation test route (shows validation errors clearly)
router.post("/test-invalid", async (req, res) => {
  try {
    await User.create({ fullName: "A", email: "bad-email", role: "unknown" });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: "Validation failed (expected)", details: e.message });
  }
});

export default router;
