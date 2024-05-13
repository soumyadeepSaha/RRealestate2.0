import { useSelector } from 'react-redux';
import { useRef, useState,useEffect} from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { updateuserstart,updateuserfailure,updateusersuccess, deleteuserfailure, deleteuserstart, deleteusersuccess, signoutuserstart, signoutuserfailure, signoutusersuccess } from '../redux/user/userslice';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
export default function  Profile() {
  const fileRef=useRef(null);
  const {currentuser,loading,error}= useSelector(state => state.user)
  const [file,setfile]= useState(undefined);//because we dont have any file initially
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formdata, setformdata] = useState({});
  const [updatesuccess,setupdatesucess] = useState(false);
  const [showlistingserror,setshowlistingserror] = useState(false);
  //piece of state to store the user listings inorder to display "showlisitns"
  const [userlistings, setuserlistings] = useState([]);
   const dispatch=useDispatch();
  useEffect(()=>{
 if(file){
  setFileUploadError(false);//self
  handlefileupload(file);
 }
  },[file]);

 const handlefileupload= (file)=>{
 const storage = getStorage(app);
 const fileName= new Date().getTime()+ file.name;
 const storageRef= ref(storage,fileName);
 const uploadTask = uploadBytesResumable(storageRef,file);

 uploadTask.on(
  'state_changed',
  (snapshot) => {
    const progress =
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setFilePerc(Math.round(progress));
  },
  (error) => {
    setFileUploadError(true);
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
      setformdata({ ...formdata, avatar: downloadURL })
    );
  }
);
//based on the id of the inputs we are going to extract the values from the field and store them in the  formdata
};
const handlechange = (e)=>{
  setformdata({ ...formdata, [e.target.id]: e.target.value });
}


const handlesubmit =async(e)=>{
  e.preventDefault();
  try{
     dispatch(updateuserstart());
     const res = await fetch(`/api/user/update/${currentuser._id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdata),
    });
     
    const data = await res.json();
      if (data.success === false) {
        dispatch(updateuserfailure(data.message));
        return;
      }

      dispatch(updateusersuccess(data));
      setupdatesucess(true);
   }catch(error){
   dispatch(updateuserfailure(error.message));
   
  }
};

const handledeleteuser = async ()=>{
  try{
    dispatch(deleteuserstart());
      
    const res = await fetch(`/api/user/delete/${currentuser._id}`,{
     method: 'Delete' ,  //we dont need to put any headers here since delete req
    });
    const data = await res.json();
    if(data.success === false){
      dispatch(deleteuserfailure(data.message));
      return;
    }
    dispatch(deleteusersuccess(data.message));
    
  }catch(error){
     dispatch(deleteuserfailure(error.message));
  }
}


 const handlesignout = async ()=>{
   
   try{
    dispatch(signoutuserstart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success=== false){
        dispatch(signoutuserfailure(data.message));
        return;
      }
      dispatch(signoutusersuccess(data));
   } catch(error){
    dispatch(signoutuserfailure(data.message));
   }


 }

   const handleshowlistings = async(e)=>{

    try{
      //before the request set error to false
      setshowlistingserror(false);//cleaning the previous error
   // fetching the user listings (db connection)
    const res = await fetch(`/api/user/listings/${currentuser._id}`);
    const data =await res.json();

    if(data.success === false){
      setshowlistingserror(true);
      return;
    }

     setuserlistings(data);

    }catch(error){
    //create another state for handeling error here
     showlistingserror(true);

    }

   }

   const handlelistingdelete = async(listingid) =>{
       try{
        const res = fetch(`/api/listing/delete/${listingid}`,{
           method: 'DELETE',
       });
       
       const data = (await res).json();
       if(data.success === false){
        console.log(data.message);
        return;
       }

         setuserlistings((prev)=> prev.filter((listing)=> listing._id !== listingid));
       }
       catch(error){
   console.log(error.message);

       }
    
   }
  

  return (
    
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form onSubmit={handlesubmit} className='flex flex-col gap-4'>
    <input onChange={(e)=>setfile(e.target.files[0])}   type='file' ref={fileRef} hidden accept='image/*'/> 
     <img onClick={()=>fileRef.current.click()} 
     src={ formdata.avatar || currentuser.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer
     self-center mt-2'/>
         <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            '' 
          )}
        </p>
    
       <input
          type='text'
          placeholder='username'
          defaultValue={currentuser.username}
          id='username'
          className='border p-3 rounded-lg'
          onChange={handlechange}
        />
          <input
          type='email'
          placeholder='email'
          defaultValue={currentuser.email}
          id='email'
          className='border p-3 rounded-lg'
          onChange={handlechange}
        />
            <input
          type='password'
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
          onChange={handlechange}
        />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg
         p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading? 'Loading...': 'update'}
         </button>
       
       <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-listing"}>Create Listing </Link>

    </form>
    <div className='flex justify-between mt-5'>
      <span onClick={handledeleteuser} className='text-red-700 cursor-pointer'>Delete account</span>
      <span  onClick={handlesignout} className='text-red-700 cursor-pointer'>Sign out</span>
    </div>
      
      <p className='text-red-700  mt-5'>{error? error :''}</p>
      <p className='text-green-700  mt-5'>{updatesuccess? 'User is updated Successfully!':''}</p>
   
     <button onClick={handleshowlistings} className='text-green-700 w-full'>Show Listings</button>
     <p className='text-red-700 mt-5'>{showlistingserror ? 'Error showing listings': '' }</p>

    
      {userlistings && userlistings.length>0 &&
     
       <div className='flex flex-col gap-4'>
     <h1 className='text-center mt-7 text-2xl font-semibold animate-bounce'>Your Listings</h1>
        { 
        userlistings.map((listing)=>(
        <div  key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4 hover:-translate-y-1 hover:scale-110 hover:bg-gray-400 duration-300 '>
         <Link to={`/listing/${listing._id}`}>
         
         <img src={listing.imageUrls[0]} alt="listing cover" className='h-16 w-16 object-contain '/>
         </Link>
         <Link className='text-slate-700 font-semibold  hover:scale-90 translate-x-2 ease-in-out truncate' to={`/listing/${listing._id}`}>
         
          <p >{listing.name}</p>
         </Link>
         <div className='flex flex-col item-center gap-3 '>
          <button onClick={()=>handlelistingdelete(listing._id)} className='text-red-700 uppercase hover:-translate-y-1 hover:scale-110  duration-300'>Delete</button>
           <Link to={`/update-listing/${listing._id}`}>
          <button className='text-green-700 uppercase hover:-translate-y-1 hover:scale-110  duration-300'>Edit</button>
          </Link>
         </div>
    
        </div>
       ))}
     
     </div> }
 
 

         
    </div> 
  )
}