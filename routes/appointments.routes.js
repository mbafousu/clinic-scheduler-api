import express from "express";
import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// Efficient queries using indexes
router.get("/", async (req, res, next) => {
  try {
    const { patientId, staffId, status } = req.query;
    const filter = {};
    if (patientId) filter.patient = patientId;
    if (staffId) filter.staff = staffId;
    if (status) filter.status = status;

    const appts = await Appointment.find(filter)
      .populate("patient", "fullName email role")
      .populate("staff", "fullName email role")
      .sort({ startTime: -1 });

    res.json(appts);
  } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: "Invalid id" });
    const appt = await Appointment.findById(req.params.id)
      .populate("patient", "fullName email role")
      .populate("staff", "fullName email role");

    if (!appt) return res.status(404).json({ error: "Appointment not found" });
    res.json(appt);
  } catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    const created = await Appointment.create(req.body);
    res.status(201).json(created);
  } catch (e) { next(e); }
});

router.patch("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: "Invalid id" });

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Appointment not found" });
    res.json(updated);
  } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: "Invalid id" });
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Appointment not found" });
    res.json({ ok: true, deletedId: deleted._id });
  } catch (e) { next(e); }
});

export default router;
