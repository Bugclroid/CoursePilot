import User from "../models/User.js";
import bcryptjs, { genSalt } from "bcryptjs"
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {

    try {
          const {name, email, password} = req.body;
          const userExist = await User.findOne({email});

          if(userExist){
            const error = new Error ("User with this email already exists");
            error.statusCode = 409;
            throw error;
          };

          const salt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password,salt);
          const newUser = await User.create({name, email ,password:hashedPassword});
          const payload = {id: newUser._id}
          const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"1d"})

          res.status(201).json({
            success: true,
            message: "Your account has been created",
            data: {
                token,
                user:{
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
            }}});

        } catch (error) {
            console.log("Error:", error)        
                res.status(error.statusCode || 500).json({
                    success:false,
                    message: error.message || "An internal server error occurred!"})
                }
            }

export const loginUser = async (req, res) => {

try {
        const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user){
        const error = new Error ("Invalid credentials");
        error.statusCode = 404 ;
        throw error;
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if(!isPasswordValid){
        const error = new Error ("Invalid credentials");
        error.statusCode=401;
        throw error;
    }
    const payload = {id: user._id}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"1d"})

    res.status(200).json({   
            success: true,
            message: "You have successfully logged in!",
            data: {
                token,
                user:{
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                    }}})
} catch (error) {
    console.log("Error: ", error);
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "An internal server error occurred!"});
}
}

export const getProfile =  async (req, res) => {
    res.status(200).json({
        success:true,
        user: req.user
    })
}
