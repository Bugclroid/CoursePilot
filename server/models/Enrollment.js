import mongoose from "mongoose"

const enrollmentSchema = new mongoose.Schema ({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    paymentStatus:{
        type: String,
        enum: ['paid', 'pending'],
        default: "pending"
    },
    paymentId:{
        type:String
    },
    amount:{
        type: Number,
        required:true
    }   
},
 { timestamps:true
    });


const Enrollment = mongoose.model("Enrollment",enrollmentSchema);
export default Enrollment;