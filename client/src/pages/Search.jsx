import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import Listingitem from "../Components/Listingitem";

export default function Search() {
    const navigate=useNavigate();
    const [sidebardata,setsidebardata] = useState({
        
        searchterm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
   
    const [loading ,setloading] = useState(false);
    const [ listings , setlistings]= useState([]);
    const [showmore , setshowmore] = useState(false);


    useEffect(() => {
        const urlparams = new URLSearchParams(location.search);
        const searchtermfromurl = urlparams.get('searchterm');
        const typefromurl = urlparams.get('type');
        const parkingfromurl = urlparams.get('parking');
        const furnishedfromurl = urlparams.get('furnished');
        const offerfromurl = urlparams.get('offer');
        const sortfromurl = urlparams.get('sort');
        const orderfromurl = urlparams.get('order');
    
        if ( //if any of these changes
          searchtermfromurl ||
          typefromurl ||
          parkingfromurl ||
          furnishedfromurl ||
          offerfromurl ||
          sortfromurl ||
          orderfromurl
        ) {
          setsidebardata({
            searchterm: searchtermfromurl || '',
            type: typefromurl || 'all',
            parking: parkingfromurl === 'true' ? true : false,
            furnished: furnishedfromurl === 'true' ? true : false,
            offer: offerfromurl === 'true' ? true : false,
            sort: sortfromurl || 'created_at',
            order: orderfromurl || 'desc',
          });
        }
    
        const fetchlistings = async () => {
          setloading(true);
          setshowmore(false);
          const searchquery = urlparams.toString();
          const res = await fetch(`/api/listing/get?${searchquery}`);
          const data = await res.json();
          //if their are more than 8 images add a button showmore to show thee other pictures // as their are possibility to have more data
           if(data.length > 8){
            setshowmore(true);
           }else{
            setshowmore(false);
           }
          
          setlistings(data);
          setloading(false);
        };
    
        fetchlistings();
      }, [location.search]);
    


   const handlechange = (e) => {
    
  // since the inputs are off different datatypes we create conditions to write their respective handlers functionality

    if(e.target.id=== 'all' || e.target.id ==='rent' || e.target.id ==='sale'){
        setsidebardata({...sidebardata , type:e.target.id})
    }

    if (e.target.id === 'searchTerm') {
        setsidebardata({ ...sidebardata, searchterm: e.target.value });
      }
  
      if (
        e.target.id === 'parking' ||
        e.target.id === 'furnished' ||
        e.target.id === 'offer'
      ) {
        setsidebardata({
          ...sidebardata,
          [e.target.id]:
            e.target.checked || e.target.checked === 'true' ? true : false, //some times the checked value is not boolean it can be string also as we can get the information from url as well

        });
      }
  
      if (e.target.id === 'sort_order') { // first value sort second value order
        const sort = e.target.value.split('_')[0] || 'created_at';
  
        const order = e.target.value.split('_')[1] || 'desc';
  
        setsidebardata({ ...sidebardata, sort, order });
      }

   };


   const handlesubmit = (e)=>{
    e.preventDefault();
    // as we just want to add information to the url and not change the existing one we need to
    // take the url value first and then update that or concatinate that with the values

    const urlparams = new URLSearchParams();
    urlparams.set('searchterm', sidebardata.searchterm);
    urlparams.set('type', sidebardata.type);
    urlparams.set('parking', sidebardata.parking);
    urlparams.set('furnished', sidebardata.furnished);
    urlparams.set('offer', sidebardata.offer);
    urlparams.set('sort', sidebardata.sort);
    urlparams.set('order', sidebardata.order);
    const searchquery = urlparams.toString();
    navigate(`/search?${searchquery}`);

   }
  
    const onshowmoreclick = async(e)=>{
       //this button is actually going to fetch more dqata
       //but based on the index 
       //we dont want to fetch the data from 0 
       // we want to fetch after 
       const numberoflistings = listings.length;
       const startindex = numberoflistings;
       const urlparams = new URLSearchParams(location.search);
       urlparams.set('startindex', startindex);
       const searchquery= urlparams.toString();
         const res = await fetch(`/api/listing/get?${searchquery}`);
         const data = await res.json();

            if(data.length < 9){
     setshowmore(false);
        }
//aqdding new list array to prev list array
         setlistings([...listings,...data]);
    };

  return (
    <div className='flex flex-col md:flex-row'>
    <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
      <form onSubmit={handlesubmit}  className='flex flex-col gap-8'>
        <div className='flex items-center gap-2'>
          <label className='whitespace-nowrap font-semibold'>
            Search Term:
          </label>
          <input
            type='text'
            id='searchTerm'
            placeholder='Search...'
            className='border rounded-lg p-3 w-full'
             value={sidebardata.searchterm}
             onChange={handlechange}

          />
        </div>
        <div className='flex gap-2 flex-wrap items-center'>
          <label className='font-semibold'>Type:</label>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='all'
              className='w-5'

              onChange={handlechange}
              checked={sidebardata.type ==='all'}
            />
            <span>Rent & Sale</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='rent'
              className='w-5'
              onChange={handlechange}
              checked={sidebardata.type === 'rent'}

            />
            <span>Rent</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='sale'
              className='w-5'
              onChange={handlechange}
              checked={sidebardata.type === 'sale'}
            />
            <span>Sale</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='offer'
              className='w-5'
              onChange={handlechange}
              checked={sidebardata.offer} //it is checking if the value is true
            />
            <span>Offer</span>
          </div>
        </div>
        <div className='flex gap-2 flex-wrap items-center'>
          <label className='font-semibold'>Amenities:</label>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='parking'
              className='w-5'
              onChange={handlechange}
              checked={sidebardata.parking}
            />
            <span>Parking</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='furnished'
              className='w-5'
              onChange={handlechange}
              checked={sidebardata.furnished}
            />
            <span>Furnished</span>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <label className='font-semibold'>Sort:</label>
          <select
             onChange={handlechange}
            defaultValue={'created_at_desc'}//for select we want to add value for them so first we want to add the values to options and onchange event listner to the react
            id='sort_order'
            className='border rounded-lg p-3'  

          > 

            <option value='regularPrice_desc'>Price high to low</option>
            <option value='regularPrice_asc'>Price low to hight</option>
            <option value='createdAt_desc'>Latest</option>
            <option value='createdAt_asc'>Oldest</option>
         
          </select>
        </div>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
          Search
        </button>
      </form>
    </div>
    <div className='flex-1'>
    <h1 className='text-3xl fonnt-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>

      <div className="p-7 flex flex-wrap gap-4">
      {!loading && listings.length === 0 && (
        <p className="text-xl text-slate-700">No lising found!</p>
      )}
      {
        loading && (
          <p className="text-xl text-slate-700 text-center w-full">Loading...</p>
        )
      }

      {
        !loading && listings && listings.map((listing)=>(
          <Listingitem key={listing._id} listing={listing}/>

        ))
      
      
      }

      {showmore && (
        <button  className="text-green-700 hover:underline p-7 text-center w-full"   onClick={onshowmoreclick}>Show more</button>
      )}

      </div>

    </div>
  </div>
  );
};
