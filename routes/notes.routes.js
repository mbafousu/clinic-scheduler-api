import express from "express";
import mongoose from "mongoose";
import Note from "../models/Note.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { appointmentId } = req.query;
    const filter = {};
    if (appointmentId) filter.appointment = appointmentId;

    const notes = await Note.find(filter)
      .populate("author", "fullName email role")
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    const created = await Note.create(req.body);
    res.status(201).json(created);
  } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: "Invalid id" });
    const deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Note not found" });
    res.json({ ok: true, deletedId: deleted._id });
  } catch (e) { next(e); }
});

export default router;
