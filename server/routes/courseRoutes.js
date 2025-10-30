import express from "express"
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "../controllers/courseController.js"
import {protect, admin} from "../middleware/authMiddleware.js"

const courseRouter = express.Router();

courseRouter.post("/", protect, admin, createCourse)
courseRouter.get("/", getAllCourses)
courseRouter.get("/:id", getCourseById)
courseRouter.put("/:id",protect, admin, updateCourse)
courseRouter.delete("/:id",protect, admin, deleteCourse)
export default courseRouter;