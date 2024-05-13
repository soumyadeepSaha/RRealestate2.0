import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import  Home  from './pages/Home'
import  About  from './pages/About'
import  Profile  from './pages/Profile'
import  Signin from './pages/Signin'
import  Signup from './pages/Signup'
import Header from './Components/Header'
import Privaterou from './Components/Privaterou'
import Createlisting from './pages/Createlisting'
import Updatelisting from './pages/Updatelisting'
import Listing from './pages/Listing'
import Search from './pages/Search'
 
export default function App(){
  return  (<BrowserRouter>
    <Header/>
         <Routes> 
       <Route path='/' element={<Home/>}/>
       <Route path='/about' element={<About/>}/>
       <Route path='/search' element={<Search/>}/>
       <Route path='/listing/:listingid' element={<Listing/>}/>
       <Route element={<Privaterou/>}>
       <Route path='/profile' element={<Profile/>}/>
       <Route path='/create-listing' element={<Createlisting/>}/>
       <Route path='/update-listing/:listingid' element={<Updatelisting/>}/>
       </Route>
       <Route path='/signin' element={<Signin/>}/>
       <Route path='/signup' element={<Signup/>}/>

      </Routes>
    </BrowserRouter>
  );
    
}
