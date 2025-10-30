import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import crypto from "crypto";

export const enrollInCourse = async (req, res) =>{
    try {
        const {courseId} = req.body
        const studentId = req.user._id

        const course = await Course.findById(courseId);
        if(!course){
            const error = new Error ("Course not found!")
            error.statusCode=404;
            throw error
        }
        const existingEnrollment = await Enrollment.findOne({ studentId: studentId, courseId: courseId });
        if (existingEnrollment) {
      const error = new Error("You are already enrolled in this course");
      error.statusCode = 400; 
    }
        const fakePaymentId = `mock_pay_${crypto.randomUUID()}`;

        const newEnrollment = new Enrollment ({
            studentId: studentId,
            courseId: courseId,
            amount: course.price,
            paymentStatus: 'paid',
            paymentId: fakePaymentId
        })
        const enrollment = await newEnrollment.save();
        res.status(201).json({
            success:true,
            enrollment: enrollment
        })
    } catch (error) {
        console.log("Error: ", error )
        res.status(500).json({
        success: false,
        message: error.message || "An internal server error occurred."})  
    }
}