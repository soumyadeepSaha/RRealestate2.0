import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorhandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup= async(req,res,next) =>{

 
 
     const { username , email, password} = req.body;
     const hashedpassword = bcryptjs.hashSync(password,10);//we are not using await as it is an sync function already;
     const newuser = new User({username,email,password: hashedpassword});
   
      try{

     await  newuser.save();
     res.status(201).json('user created successfully');
    

      }
      catch(error){
        next(error);
      }


};



export const signin = async(req,res,next)=>{
 
  const {email,password} = req.body;
 try{
  //first checking the email
  const validuser = await User.findOne({email});
  if(!validuser){
    //so this is not basically an actual error but we want to show an error that mail was not found so here we use the error handler
    return next(errorhandler(404,'user not found'));
  }
  
  const validpassword = bcryptjs.compareSync(password,validuser.password);
 
  if(!validpassword) return next(errorhandler(401,'wrong credentials!'));
   
  const token = jwt.sign({id: validuser._id}, process.env.JWT_SECRET);
 const { password: pass, ...rest } = validuser._doc;

 //after creating the token we wanna save this token as cookie and send that to browser

 res.cookie('access_token',token,{httpOnly: true}).status(200)
 .json(rest); 
}
 catch(error){
  next(error);
 }
}



export const google = async (req,res, next)=>{
 try{
    // if the user existed which we are getting fromthe google authenticaion no need to entry indb'
    const user = await User.findOne({email:req.body.email});
    if(user){
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
      const{ password: pass, ...rest} = user._doc;
      res 
         .cookie('access_token',token,{httpOnly:true})
         .status(200)
         .json(rest);
    }else{
      // if you see the model for signing up we need password as the field is required but on google oAuth sign in
      //we dont really get the password from the google auth
      //so we need to create a password a randomone later if the user wants he will udate the password

      const generatedpassword = Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8);//last 8 digits(-8)
      const hashedpassword = bcryptjs.hashSync(generatedpassword,10);
      const newuser = new User({username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) ,email: req.body.email , password: hashedpassword, avatar: req.body.photo});// after creation it will create an id etc etc

 // add avatar to the model and give it a default pic for each entry other then the google authed entry
 // so we created this new user now we will save it

  await newuser.save();
  const token = jwt.sign({id: newuser._id }, process.env.JWT_SECRET);
  const { password: pass,...rest}= newuser._doc;
  res.cookie('access_token', token,{httpOnly: true}).status(200).json(rest);
    }
 }catch(error){
  next(error);
 }
};

export const signout = async (req,res,next) =>{

   try{
     res.clearCookie('access_token');
     res.status(200).json('User has beed logged out!');
   } catch(error){
     next(error);
   }



}