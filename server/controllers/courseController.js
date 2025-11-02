import Course from "../models/Course.js";

export const createCourse = async (req, res, next) =>{
    try {
        const {title, description, price, duration } = req.body
        const adminId = req.user._id;

        const course = new Course({title, description, price, duration, createdBy : adminId })

        const createdCourse = await course.save();

        res.status(201).json({
            success: true,
            course: createdCourse
        })
        

    } catch (error) {
        console.log("Error: ", error )
        res.status(500).json({
      success: false,
      message: error.message || "An internal server error occurred.",
    });
    }
}

export const getAllCourses = async (req, res, next) => {

    try {
        const courses = await Course.find({}).populate("createdBy", "name email")
        res.status(200).json({
            success: true,
            courses: courses
        })
    } catch (error) {
        console.log("Error: ", error )
        res.status(500).json({
      success: false,
      message: error.message || "An internal server error occurred."})  
    }
}

export const getCourseById = async (req, res, next) => {

    try {

        const courseId = req.params.id
        const course = await Course.findById(courseId).populate("createdBy","name email")
        
        if(!course){
            const error = new Error ("Course not found")
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            course: course
        })

    } catch (error) {
        console.log("Error: ", error )
        res.status(500).json({
      success: false,
      message: error.message || "An internal server error occurred."})  
    }
}

export const updateCourse = async(req, res, next) =>{
    try {
        const courseId = req.params.id
        const course = await Course.findById(courseId)
        
        if(!course){
            const error = new Error ("Course not found")
            error.statusCode = 404;
            throw error;
        }

        course.title = req.body.title || course.title;
        course.description = req.body.description || course.description;
        course.price = req.body.price || course.price;
        course.duration = req.body.duration || course.duration;

        const updateCourse = await course.save();

        res.status(200).json({
            success: true,
            course: updateCourse
        })
    } catch (error) {
        console.log("Error: ", error )
        res.status(500).json({
      success: false,
      message: error.message || "An internal server error occurred."})  
    }
}

export const deleteCourse = async (req, res, next) =>{
    try {
        const courseId = req.params.id
        const course = await Course.findById(courseId);
         if(!course){
            const error = new Error ("Course not found")
            error.statusCode = 404;
            throw error;
        }
      const deleteCourse = await course.deleteOne({_id: courseId})
        res.status(200).json({
        success: true,
        message: "Course deleted successfully"
        });
        
    } catch (error) {
        console.log("Error: ", error )
        res.status(500).json({
        success: false,
        message: error.message || "An internal server error occurred."})  
    }
}