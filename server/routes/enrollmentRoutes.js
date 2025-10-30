import express from "express"
import { enrollInCourse } from "../controllers/enrollmentController.js"
import {protect, student} from  "../middleware/authMiddleware.js"

const enrollmentRouter = express.Router();


enrollmentRouter.post('/', protect, student, enrollInCourse)

export default enrollmentRouter;