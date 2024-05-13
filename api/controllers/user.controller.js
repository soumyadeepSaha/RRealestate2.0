import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorhandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
export const test = (req,res)=>{
    res.json({
        message: "ho gaya bc",
    })

};

export const updateuser = async(req,res,next)=>{
    if(req.user.id !== req.params.id) 
    return next(errorhandler(401,'you can only update your own account'))
   // if the user is correct update the user and since update is a mongodb related operation so we write the logic in the try and catch block
    
    try{
    //if we want to updae the password
    if(req.body.password){
        //hash the passeord
        req.body.password = bcryptjs.hashSync(req.body.password,10);

    }
    //now note the user wont always update all the fields(ex-password,username,email) so inorder to update any of the given fields we will use an method(set)
    //set is going to check if the data of the field changs if not set is going to ignore that data

    //new: true is going to return and save the updated user with the new information otherwise we are going to get the previous information in our response
    const updateduser = await User.findByIdAndUpdate(
        req.params.id,{
        
          $set: {
            username: req.body.username,
            email: req.body.email,
            password:req.body.password,
            avatar: req.body.avatar,
          },
    }, {new: true});

     const{password , ...rest}= updateduser._doc;

     res.status(200).json(rest);
    }catch(error){

      next(error);
    }
};


export const deleteuser =async(req,res,next)=>{
 
  if(req.user.id !== req.params.id)return next(errorhandler(401,'you can only delete your own account!'));

  try{
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token'); //first delete the cookie then send the res
    res.status(200).json('User has been deleted');

  }catch(error){
   next(error);
  }

};

export const getuserlistings = async(req,res,next)=>{

  if(req.user.id === req.params.id) {
    try{ //here we are saying to find the listing that is having the userref = current user
   const listings = await Listing.find({userRef: req.params.id});
    res.status(200).json(listings);
    }catch(error){
       next(error);
    }
  }else{
    return  next(errorhandler(401,'You can only view your own listings !'));

  }
 
}



export const getuserr = async (req,res,next)=>{
   try{
  const user= await User.findById(req.params.id);

  if(!user) return next(errorhandler(404,'User not found'));

  const {password: pass , ...rest}= user._doc;

  res.status(200).json(rest);

   }catch(error){

  next(error);

   }


};
