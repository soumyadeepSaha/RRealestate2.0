import express from "express";
import { deleteuser, test, updateuser,getuserlistings, getuserr} from "../controllers/user.controller.js";
import { verifytoken } from "../utils/verifyuser.js";


const router = express.Router();

router.get('/test',test);
router.post('/update/:id', verifytoken, updateuser);
router.delete('/delete/:id', verifytoken, deleteuser);
router.get('/listings/:id',verifytoken, getuserlistings);
router.get('/:id',verifytoken,getuserr);
export default router;



