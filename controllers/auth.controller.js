import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../Models/user.model.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }
  const result = await User.findOne({ email });
  if (result) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const userStream = {
    Email: email,
    password: hash,
  };
  const user = await User.create(userStream);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  return res
    .status(201)
    .json({ success: true, message: "User created", token: token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }
  const result = await User.findOne({ Email: email });
  if (!result) {
    return res
      .status(400)
      .json({ success: false, message: "User does not exist" });
  }
  const isMatch = await bcrypt.compare(password, result.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Incorrect password" });
  }

  return res.status(200).json({ success: true, message: "User logged in" });
};
