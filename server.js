import express from "express";
import router from "./Router/auth.route.js";
import Taskrouter from "./Router/task.route.js";
import { connectDB } from "./database/mongodb.js";
const app = express();

app.use(express.json());
app.use(`${process.env.BASE_URI}/`, router);
app.use(`${process.env.BASE_URI}/tasks`, Taskrouter);
app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
  connectDB();
});
