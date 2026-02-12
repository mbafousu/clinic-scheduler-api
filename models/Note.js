import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, minlength: 5, maxlength: 1000, trim: true }
  },
  { timestamps: true }
);

// Index
noteSchema.index({ appointment: 1, createdAt: -1 });

export default mongoose.model("Note", noteSchema);
