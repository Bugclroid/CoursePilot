import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
try {
        let token 
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(' ')[1];
        };
        if(!token){
            const error = new Error("No authorization")
            error.statusCode = 401;
            throw error
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id).select("-password")

        if(!req.user){
            const error = new Error("User belonging to this token no longer exits.")
            error.statusCode = 401;
            throw error;
        }
        next();

} catch (error) {
        console.log("Error: ",error)
        let message = "Not authorized";
    if (error.name === "JsonWebTokenError") {
      message = "Invalid token";
    } else if (error.name === "TokenExpiredError") {
      message = "Token has expired";
    }

    res.status(401).json({
      success: false,
      message: message,
    });
  }
};

export const admin = (req, res, next) => {
     if(req.user && req.user.role === "admin"){
      next();}
    else{
      res.status(403).json({
        success:false,
        message: "Not authorized as an admin",
      })


    }
}

export const student = (req, res, next)=>{
  if(req.user && req.user.role === "student"){
      next();}
    else{
      res.status(403).json({
        success:false,
        message: "Not authorized as an student",
      })
    }

}