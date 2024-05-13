import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom";
export default function Privaterou() {
   
    const {currentuser}= useSelector(state=> state.user);
  return currentuser ? <Outlet/>:<Navigate to='/signin' />

}
// here we will give the condition to private the child routes
// if we have the current user entry in the redux that means the person is authenticated thats how we are privating the profile page via frontend
// and not by backend
