import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import Listingitem from "../Components/Listingitem";
export default  function Home(){
  const [offerlistings,setofferlistings]= useState([]);
  const [salelistings ,setsalelistings ] = useState([]);
  const [rentlistings,setrentlistings] = useState([]);
  //now we will fetch the datas for the offers,sake,rent etc
  // with the useeffect hook
  console.log(salelistings);  

  SwiperCore.use([Navigation]);
  useEffect(()=>{
     const fetchofferlistings = async ()=>{
    
      try{
    const res = await fetch('/api/listing/get?offer=true&limit=4');
    const data = await res.json();
    setofferlistings(data);
    fetchrentlistings(); // calling this functionafter the offer function fetching complete to make the page more systematic

      }catch(error){
         console.log(error);   
      }
    };
      const fetchrentlistings =async()=>{
        try{
          const res = await fetch(`/api/listing/get?rent=true&limit=4`);
          const data = await res.json();
          setrentlistings(data);
          fetchsalelisting(); 
            }catch(error){
             console.log(error);
            }
      };
    
   const fetchsalelisting = async ()=>{
    try{  const res = await fetch(`/api/listing/get?sale=true&limit=4`);
    const data = await res.json();
    setsalelistings(data);
// so now in this case we get all the data one by one in the page
}catch(error){
       console.log(error);
    }
  };
     fetchofferlistings();
  },[]);

  return (
  <div>
    {/*top*/}
 

      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Unlock Your Dream  
         <span className='text-slate-500'>Perfect</span>
         <br/>Home at SahaJodestate 
      </h1>
      <div className='text-gray-400 text-xs sm:text-sm'>
      SahaJodestate: Redefining Your Living Space Experience
Discover Your Ideal Home <br/>
with Ease
Where Dreams Meet Reality in Real Estate
      </div>
      <Link to={"search"}  className='text-xs sm:text-sm text-blue-800 font-bold hover:underline '>
      One Click Away to explore...
      </Link>
      </div>


      {/* swiper   we are going to create an swiper for offers*/}
       
      <Swiper  modules={[Navigation, Pagination, Autoplay]}
     
     slidesPerView={1}
     navigation
     autoplay={{delay:3000}}
     pagination={{clickable: true}}>
        {offerlistings &&
          offerlistings.length > 0 &&
          offerlistings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>





      {/* listing results for offer sale and rent jod*/}
       




<div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerlistings && offerlistings.length > 0 && (
          <div className=' '>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerlistings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentlistings && rentlistings.length > 0 && (
          <div className='mt-[10px] '>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentlistings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {salelistings && salelistings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {salelistings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
  </div>
  )
}
