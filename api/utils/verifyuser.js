import { errorhandler } from "./error.js";
import jwt from 'jsonwebtoken';
export const verifytoken = (req,res,next)=>{
    const token = req.cookies.access_token;

     if(!token) return next(errorhandler(401,'Unauthorized'));
  
      //if their is a token we are going to check if the token is correct or not
      
    jwt.verify(token,process.env.JWT_SECRET, (err,user)=>{
        if(err) return next(errorhandler(403,'Forbidden'));

         req.user=user;
         next();

    });

};