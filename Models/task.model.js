import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  inprogress: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Userex",
  },
});

export const Tasks = mongoose.model("Tasks", taskSchema);
