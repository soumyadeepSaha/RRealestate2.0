import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { Link ,useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux'
export default function Header() {
  const {currentuser}= useSelector( state => state.user);
  const [searchterm , setsearchterm]= useState('');
  const navigate = useNavigate();
  
  const handlesubmit = (e) =>{
    e.preventDefault();
    //we want to keep the previous queries we get from the search bar
    // and then we concatinate the other we addd wiith check boxes
    // inorder to get this information we can use js buit in constructor
    // urlsearchparams

    const urlparams = new URLSearchParams(window.location.search);
    urlparams.set('searchterm', searchterm); //once done we want to navigate the user to thagt url
    const searchquery = urlparams.toString(); //because some of them are number etc
      navigate(`/search?${searchquery}`);
  };

    useEffect(()=>{// this is done so that each time we change the query in the url react refreshes the page

      const urlparams = new URLSearchParams(/*window.*/ location.search);
      const searchtermfromurl = urlparams.get('searchterm');
      if(searchtermfromurl){
        setsearchterm(searchtermfromurl); //so that when we change search term in url we see that in  the search bar also

      }

    },[location.search])

  return (
    <header className='bg-slate-200 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
    <Link to='/'>
    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
       <span className='text-slate-500'>SahaJod</span> 
       <span className='text-slate-700'>Estate</span>
    </h1>
    </Link>
   <form onSubmit={handlesubmit}  className='bg-slate-100 p-3 rounded-lg flex items-center'>
   <input
    type='text'
    placeholder='search karo bro'
    className='bg-transparent focus:outline-none w-24 sm:w-64'
    value={searchterm}
    onChange={(e)=>setsearchterm(e.target.value)}

/>
<button>
<FaSearch className='text-slate-600' />
</button>
  </form> 
   <ul className='flex gap-4'>

   <Link to= '/'>
   <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>
    Home
   </li>
   </Link>

   <Link to= '/about'>
   <li className='hidden sm:inline text-slate-700 hover:underline'>
    About 
   </li>

   </Link>
 
   <Link to= '/profile'>
{currentuser ?(
 <img  className='rounded-full h-7 w-7 object-cover'src={currentuser.avatar} alt='profile'/>
):(
  <li className='text-slate-700 hover:underline'>Sign in</li>
) }
    </Link>
   </ul>
 </div>
 </header>
  );
}
