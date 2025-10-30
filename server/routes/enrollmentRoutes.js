import express from "express"
import { enrollInCourse, getStudentEnrollments, getAdminEnrollments } from "../controllers/enrollmentController.js"
import {protect, student, admin} from  "../middleware/authMiddleware.js"

const enrollmentRouter = express.Router();


enrollmentRouter.post('/', protect, student, enrollInCourse);
enrollmentRouter.get('/student', protect, student, getStudentEnrollments);
enrollmentRouter.get('/admin', protect, admin, getAdminEnrollments);

export default enrollmentRouter;