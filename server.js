import express from "express";
import router from "./Router/auth.route.js";
import Taskrouter from "./Router/task.route.js";
import { connectDB } from "./database/mongodb.js";
const app = express();

app.use(express.json());
app.use(`${process.env.BASE_URI}/`, router);
app.use(`${process.env.BASE_URI}/tasks`, Taskrouter);

const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running");
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });
