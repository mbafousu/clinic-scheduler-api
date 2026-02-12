import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, minlength: 2, maxlength: 80, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /.+@.+\..+/
    },
    role: { type: String, enum: ["patient", "staff"], required: true }
  },
  { timestamps: true }
);

// Indexes
userSchema.index({ unique: true });
userSchema.index({ role: 1 });

export default mongoose.model("User", userSchema);
