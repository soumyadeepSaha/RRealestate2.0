import Listing from "../models/listing.model.js";
import { errorhandler } from "../utils/error.js";

export const createlisting = async(req,res,next)=>{

  try{
    const listing = await Listing.create(req.body);
   return res.status(201).json(listing);
  
}catch(error){

    next(error);
  }
};

export const deletelisting =async(req,res,next)=>{

 // first check if the listing is available or not 

  const listing = await Listing.findById(req.params.id);

   if(!listing){
    return next(errorhandler(404, 'Listing not found'));
   }
 // if the listing exist check if its the users list or not
   if(req.user.id!==listing.userRef){
    return next(errorhandler(401, 'You can delete your own listings!'))

   }

   try{
      await Listing.findByIdAndDelete(req.params.id);
       res.status(200).json('Listing has been deleted!');
   }catch(error){
     next(error);
   }

};


 export const updatelisting = async (req,res,next)=>{
   // first checking listing exist or not 

   const listing = await Listing.findById(req.params.id);

   if(!listing){
    return next(errorhandler(404,'listing not found!')); 
   }

   // if exist we check if lisiting he is tryin to update belongs to him or not
   if(req.user.id !== listing.userRef){ //req.user.id (which we get from user/cookie)

    return next(errorhandler(401,'You can only update your own listing'));
   }
 //otherwise we want to update the listing

 try{

   const updatedlisting = await Listing.findByIdAndUpdate(
    req.params.id, //first we wanna pass he id of the listing we are updating
    req.body, //update it with the req.body
    {new: true} // it will give you the new updated listing if you dont do that you will get the previous one and not the updated one
   );
      res.status(200).json(updatedlisting);               //200 is an OK response
 } catch (error) {
     next(error);
}
};



export const getlisting = async (req , res , next)=>{
try{
 
  const listing = await Listing.findById(req.params.id);

  if(!listing){
    return next(errorhandler(404,'Listing not found!'));
  }
  res.status(200).json(listing);

} catch (error) {
  next(error);
}
};


export const getlistings = async(req,res,next)=>{
  
   try{
   // our motive is to search inside the listing
    // we want to get something like limit we want to limit the page because we want to have pagination, we want to have the start index we want to know which page we are in and also we awant to get the offer , furnished etc   
   
     const limit = parseInt(req.query.limit)|| 9;
     const startindex = parseInt(req.query.startindex)|| 0;
     
     let offer = req.query.offer;

    if(offer === undefined || offer === ' false'){
      offer = {$in: [false,true]}; //this logic says'in' to search inside the database for both true and false values of offer

    }

    let furnished = req.query.furnished;

    if(furnished ===  undefined || furnished === 'false'){
      furnished = {$in: [ false,true]};
    }

    let parking = req.query.parking;
     
     if(parking === undefined|| parking ==='false'){
      parking = {$in: [false,true]};
     }

     let type = req.query.type; //type selected that means 'all'


     if(type ===undefined || type==='all'){
       
        type = { $in: ['sale' , 'rent']};
       
     }

        const searchterm = req.query.searchterm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';


    const listings = await Listing.find({ //regex is a built in search functionailityfor mongo db it is going to search for evey element in the title

      name:{$regex: searchterm, $options: 'i'}, //options: 'i' means dont care about the lower case and upper case
          offer,
          furnished,
          parking,
          type,
    }).sort({[sort]: order}).limit(limit).skip(startindex);
      
       return res.status(200).json(listings);
    
   }catch(error){

    next(error);

   }
  

};


