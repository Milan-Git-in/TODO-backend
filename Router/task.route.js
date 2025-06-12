import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const Taskrouter = Router();

Taskrouter.get("/get", getTasks);
Taskrouter.post("/create", createTask);
Taskrouter.put("/update/:id", updateTask);
Taskrouter.delete("/delete/:id", deleteTask);

export default Taskrouter;
