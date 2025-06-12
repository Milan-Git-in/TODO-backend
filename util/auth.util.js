import jwt from "jsonwebtoken";
import { User } from "../Models/user.model.js";
export const verify = async (headers) => {
  const token = headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized", headers: req.headers });
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(payload.id);

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "No User found with this Token" });
  }
  return user;
};
