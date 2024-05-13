import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


//we are making this component as this component will directly do the mail stuff without showing the user about the infos//gujamil
// we could have got the listing as a prop and distructure  it but we will destructure it onthe fly

export default function Contact({listing}) {

   const [landlord, setlandlord] = useState(null);
  const [message,setmessage] = useState('');

  const onchange = (e)=>{
 setmessage(e.target.value);
  };

   useEffect(()=>{
          const fetchlandlord = async(req,res,next)=>{
            try{
          const res = await fetch(`/api/user/${listing.userRef}`);
   const data = await res.json();
           setlandlord(data);
            }catch(error){

            console.log(error);
            }

          };
          fetchlandlord();

   },[listing.userRef])
 


    //now here we want the information of the landlord of the lising
    // so we need to create an apiroute to fetch the information of the user who made it
    //but for fetching the information of a public user you need to be authenticated
  return (
    
    <>
    
    {landlord && (
        <div className='flex flex-col gap-2'>
          <p>Contact <span className='font-semibold'>{landlord.username}</span>for
          <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>

          <textarea name="message " id='message' rows='2' value={message} onChange={onchange}
          placeholder='Enter your message here...'
          className='w-full border p-3 rounded-lg '
          >

          </textarea>

          <Link
          to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
              Send Message
          </Link>
  

        </div>

    )}


    </>
  )
}
