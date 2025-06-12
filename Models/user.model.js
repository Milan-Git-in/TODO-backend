import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Email: { type: String, required: [true, "Email is required"], unique: true },
  password: {
    type: String,
    required: [true, "Password is required"],
    min: [3, "Password must be at least 3 characters"],
    max: [20, "Password must be at most 20 characters"],
  },
});

export const User = mongoose.model("Userex", userSchema);
