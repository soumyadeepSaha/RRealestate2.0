import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signinsuccess } from '../redux/user/userslice';
export default function OAuth() {
     const navigate=useNavigate();
      const dispatch = useDispatch();
    const handleGoogleClick = async ()=>{
        try{
     const provider  = new GoogleAuthProvider();
     const auth = getAuth(app);
     //sign up popup

     const result =await signInWithPopup(auth,provider)//firebase func

        
         // so after we get the result from the google about all the information of the user
        //we wil send them to the backend to create the user

      const res = await fetch('/api/auth/google' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' ,
        },
        body: JSON.stringify({
            name: result.user.displayName, email: result.user.email, photo: result.user.photoURL
        }),
      })

      const data= await res.json();
       
      dispatch(signinsuccess(data));
    
     navigate("/");
      // in the above case*******we cannot test this from the backend theirfore we create the fron end first to ge data from the oAuth and then we can send that to the end point so theirfore wwe make backend after word

        } catch(error){
            console.log('could not sign in with google', error);

        }

    }
  
  return (
    <button
    onClick={handleGoogleClick}
    type='button'
    className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
  >
    Continue with google
  </button>
  )
}
