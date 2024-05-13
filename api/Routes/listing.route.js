import express from 'express'
import { createlisting,deletelisting,updatelisting,getlisting,getlistings} from '../controllers/listing.controller.js';
import { verifytoken } from '../utils/verifyuser.js';

const router = express.Router();

router.post('/create',verifytoken,createlisting);
router.delete('/delete/:id',verifytoken,deletelisting);
router.post('/update/:id', verifytoken , updatelisting);
router.get('/get/:id' , getlisting); //this is not a private each user will be able to get to see the listings inthe home page
router.get('/get', getlistings);//notprotected as everyone can search in

export default router;