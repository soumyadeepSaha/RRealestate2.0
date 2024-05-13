
import React, {  useEffect, useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable}from 'firebase/storage';
import {app} from '../firebase'
import {useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
export default function Createlisting() {

    const navigate = useNavigate();
    const params = useParams();
  const {currentuser} = useSelector(state => state.user)
    const [files , setfiles] = useState([]);
   

    const [formdata, setformdata] = useState({
      imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    });
    const [imageuploaderror , setimageuploaderror]= useState(false);
    const [uploading, setuploading] = useState(false);
    const [error,seterror] = useState(false);//db connec
    const [loading,setloading] = useState(false); //db connec

     //inorder to get the id from the url of the browser we can use "Uueparams hook"
    
    useEffect(()=>{
     const fetchlisting = async ()=>{
        const listingid = params.listingid;
        console.log(listingid);
    //listing id because inside app.jsx we kept the path as listingid
      
      const res = await fetch(`/api/listing/get/${listingid}`);
      const data = await res.json(); 
        
      if(data.success === false){
        console.log(data.message);
        return;
      }
      
      console.log(data.message);
       setformdata(data);
       
     };

     fetchlisting();
    },[]);



    const handleimagesubmit = (e) =>{
     if(files.length >0 && files.length + formdata.imageUrls.length<7){
      setuploading(true);
      setimageuploaderror(false);
      const promises = [];

      for(let i=0;i<files.length;i++){
         promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls)=>{
        setformdata({...formdata , imageUrls: formdata.imageUrls.concat(urls)});
        setimageuploaderror(false);
       setuploading(false);
      }).catch((err)=>{
        setimageuploaderror('Image upload failed (2mb max per image');
        setuploading(false);
      })
     }
     else{
      setimageuploaderror('you can only upload 6 images per listing');
      setuploading(false);
     }

    };

    const storeImage = async (file)=>{
      return new Promise((resolve , reject)=>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage,fileName);
       const uploadTask = uploadBytesResumable(storageRef , file);
         uploadTask.on(
          "state_changed",
           (snapshot) => {
            const progress = 
            (snapshot.bytesTransferred / snapshot.totalBytes)* 100;
           console.log(`upload is ${progress}% done`);
           },
          (error)=>{
            reject(error);

          },
          ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                resolve(downloadURL);
              });
          }
         )
      });
    };

    const handleremoveimage = (index) =>{
      setformdata({
        ...formdata,
        imageUrls: formdata.imageUrls.filter((_,i)=> i!==index),
      })
    }
 
const handlechange = (e) =>{

  if(e.target.id==='sale'  || e.target.id ==='rent' ){
    setformdata({
      ...formdata,
      type: e.target.id
    })
  }

  if (
    e.target.id === 'parking' ||
    e.target.id === 'furnished' ||
    e.target.id === 'offer'
  ) {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.checked, 
    });
  }
  if (
    e.target.type === 'number' ||
    e.target.type === 'text' ||
    e.target.type === 'textarea'
  ) {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,  
    });
  }
 

}

 const handlesubmit = async(e) =>{
   
  e.preventDefault();
  

   try{
    if(formdata.imageUrls.length < 1) return seterror('you must upoad at least one image');
   
    if(+formdata.regularPrice < +formdata.discountPrice) return seterror('Discount price must be lower than regular price')

    seterror(false); 
     setloading(true); 
  
     const res = await fetch (`/api/listing/update/${params.listingid}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formdata,
        userRef: currentuser._id, //bring current user from redux inorder to use it in user reference
      }),

     });
     const data = await res.json();
     setloading(false);



     
     if(data.success === false){
      seterror(data.message);

     }
     navigate(`/listing/${data._id}`) 

   }catch(error){
   
    seterror(error.message);
    setloading(false);

   }
 }


  return ( 
    <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>
   Update a Listing
    </h1>
    <form onSubmit={handlesubmit} className='flex flex-col sm:flex-row gap-4'>
    <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handlechange}
            value={formdata.name}
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handlechange}
            value={formdata.description}
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handlechange}
            value={formdata.address}
          />
        <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
                <input type='checkbox' id='sale' className='w-5' onChange={handlechange} checked={formdata.type==='sale'}/>
                <span>Sell</span>
            </div>
            <div className='flex gap-2'>
                <input type='checkbox' id='rent' className='w-5' onChange={handlechange} checked={formdata.type==='rent'} />
                <span>Rent</span>
            </div>
            <div className='flex gap-2'>
                <input type='checkbox' id='parking' className='w-5 '  onChange={handlechange} checked={formdata.parking} />
                <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
                <input type='checkbox' id='furnished' className='w-5 '  onChange={handlechange} checked={formdata.furnished}/>
                <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
                <input type='checkbox' id='offer' className='w-5 '  onChange={handlechange} checked={formdata.offer}/>
                <span>Offer</span>
            </div>
        </div>
        <div className='flex flex-wrap gap-6 '>
        <div className='flex items-center gap-2'>
             <input type='number' id='bedrooms' min='1' max='10'
            required className='p-3 border border-gray-300 rounded-lg'    onChange={handlechange}  value={formdata.bedrooms} />
        <p>Beds</p>
        </div>
        <div className='flex items-center gap-2'>
             <input type='number' id='bathrooms' min='1' max='10'
            required className='p-3 border border-gray-300 rounded-lg'  onChange={handlechange} value={formdata.bathrooms}/>
        <p>Baths</p>
        </div>
        <div className='flex items-center gap-2'>
             <input type='number' id='regularPrice' min='50' max='1000000'
            required className='p-3 border border-gray-300 rounded-lg'  onChange={handlechange} value={formdata.regularPrice}/>

         <div className='flex flex-col items-center'>
         <p>Regular Price</p>
        <span className='text-sx'>($ / month)</span>
         </div>
        </div>
        { formdata.offer &&(
        <div className='flex items-center gap-2'>
             <input type='number' id='discountPrice' min='0' max='1000000'
            required className='p-3 border border-gray-300 rounded-lg'  onChange={handlechange} value={formdata.discountPrice}/>
            <div className='flex flex-col items-center'>
            <span>Discounted price</span>
          <span className='text-sx'>($ / month)</span>
            </div>
      
        </div>)
        }

        </div>
     </div>    
     <div className='flex flex-col flex-1 gap-4 '>
     <p className='font-semibold'>Images:
     <span className='font-normal text-gray-600 ml-2 '>The first image will be the cover (max 6)</span>
     </p>
     <div className='flex gap-4'>
       <input onChange={ (e)=>setfiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type='file' id='images' accept='image/*' multiple />
       <button disabled={uploading} type='button' onClick={handleimagesubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lgdisabled:opacity-80'>{uploading?'Uploading...' : 'Upload'}</button>
     </div>
     <p className='text-red-700 text-sm'>{imageuploaderror &&imageuploaderror} </p>
     {
       formdata.imageUrls.length > 0 && formdata.imageUrls.map((url,index)=>(
       <div key={url} className='flex justify-between p-3 border items-center'>
       <img src={url}  alt='listing image' className='w-20 h-20 object-contain rounded-lg'/>
       <button type='button' onClick={()=>handleremoveimage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
        </div>
       ))
     }
     <button disabled={loading || uploading } 
     className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 '>{loading? 'Updating...' : 'Update listing'}</button>
     {error && <p className='text-red-700 text-sm'>{error}</p>}
   </div> 
 </form>   
  </main>
  )
}

 