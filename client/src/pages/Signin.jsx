
import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signinstart,signinsuccess,signinfailure } from '../redux/user/userslice';
import OAuth from '../Components/OAuth';

export default function Signin() {
 const [formdata,setformdata] = useState({});
// we can import states from redux store to use here (global variables )by useSelector

const { loading, error}= useSelector((state)=> state.user);
 const navigate = useNavigate();
 const dispatch = useDispatch();



 const handlechange = (e)=>{
    setformdata(
      {
        ...formdata,//storing the previous values while changing the new
         [e.target.id]:e.target.value,
      }
    );
 };

const handlesubmit = async (e)=>{
  e.preventDefault();//inorder to stop refreshing the pages on submit
   
  try{
    dispatch(signinstart());
   const res = await fetch('/api/auth/signin', 
     { 
      method: 'POST',
      headers:{
        'content-Type': 'application/json',
      },
     body: JSON.stringify(formdata),
     }
  );
  const data= await res.json();
  if(data.success ===false){
   // when error happend
   dispatch(signinfailure(data.message));
   
       return;
  }
 dispatch(signinsuccess(data));
  navigate('/');
  } catch(error){
  dispatch(signinfailure(error.message));
  }
};

  return (
    <div className='p-3 max-w-lg mx-auto'>

     <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handlesubmit}
      className='flex flex-col gap-4'>
       <input type='email' placeholder='email'
       className='border p-3 rounded-lg' id='email' onChange={handlechange}/>
       <input type='password' placeholder='password'
       className='border p-3 rounded-lg' id='password' onChange={handlechange}/>
       <button  disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95
       disabled:opacity-80'>{loading?'Lodaing...':'Sign In' }</button>
       <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an account?</p>
        <Link to={"/signup"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}


