import { Tasks } from "../Models/task.model.js";
import { verify } from "../util/auth.util.js";

export const getTasks = async (req, res) => {
  const user = await verify(req.headers);
  const tasks = await Tasks.find({ user: user._id });
  if (tasks.length === 0)
    return res
      .status(200)
      .json({ success: true, message: "No tasks found", tasks: [] });
  return res
    .status(200)
    .json({ success: true, message: "Tasks fetched", tasks: [tasks] });
};

export const createTask = async (req, res) => {
  const User = await verify(req.headers);

  const { title, description, completed, inprogress } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  await Tasks.create({
    title,
    description,
    user: User._id,
  });
  return res.status(201).json({ success: true, message: "Task created" });
};

export const updateTask = async (req, res) => {
  // confirms that user is valid and we dont need to store as its not necessary
  await verify(req.headers);

  const { id } = req.params;
  const target = req.query.target;

  const allowed = ["title", "description", "completed", "inprogress"];
  if (!allowed.includes(target)) {
    return res.status(400).json({ error: "Invalid field to update" });
  }

  const newValue = req.body[target];

  await Tasks.updateOne({ _id: id }, { $set: { [target]: newValue } });
  return res.status(200).json({ success: true, message: "Task updated" });
};

export const deleteTask = async (req, res) => {
  const target = req.params.id;

  const flag = await Tasks.findOneAndDelete({ _id: target });

  if (!flag) return res.status(404).json({ error: "Task not found" });
  return res.status(200).json({ success: true, message: "Task deleted" });
};
