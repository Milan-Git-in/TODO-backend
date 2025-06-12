import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { AUTHENTICATE } from "../Middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", AUTHENTICATE, login);
export default router;
