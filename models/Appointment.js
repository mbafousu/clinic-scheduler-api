import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    startTime: { type: Date, required: true },
    reason: { type: String, required: true, maxlength: 200, trim: true },
    status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" }
  },
  { timestamps: true }
);

// Indexes for efficient queries
appointmentSchema.index({ patient: 1, startTime: -1 });
appointmentSchema.index({ staff: 1, startTime: -1 });

export default mongoose.model("Appointment", appointmentSchema);
