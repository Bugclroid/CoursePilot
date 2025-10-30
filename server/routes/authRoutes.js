import express from "express";
import {registerUser, loginUser, getProfile} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup",registerUser);
authRouter.post("/signin",loginUser);
authRouter.get("/profile", protect, getProfile)

export default authRouter;