import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRouter from './Routes/auth.route.js'
import userrouter from './Routes/user.route.js';
import listingrouter from './Routes/listing.route.js';

import path from 'path';





import cookieParser from "cookie-parser";
dotenv.config();

const __dirname = path.resolve();

const app = express();
 
app.use(express.json());// this is going to allow json as the input of the server

app.use(cookieParser());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongodb');
}).catch((err)=>{
    console.log(err);
});


app.listen(3000,()=>{
    console.log("server is running on port 3000!");

});


app.use('/api/user',userrouter);
app.use('/api/auth',authRouter);
app.use('/api/listing' , listingrouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err,req,res,next) =>{
    const statuscode = err.statusCode || 500;
    const message =err.message || 'Internel Server Error';
    
    return res.status(statuscode).json({
        success:false,
        statuscode,
        message,
    });

}); 