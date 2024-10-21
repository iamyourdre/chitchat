import React from 'react'
import { HiOutlineLogout } from 'react-icons/hi'
import useRedirect from '../hooks/useRedirect';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { clearCredentials } from "../slices/authSlice";

const Logout = () => {

  const redirect = useRedirect();
  const dispatch = useDispatch();
  
  const handleLogout = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.delete('http://localhost:5000/api/user/logout');
      dispatch(clearCredentials());
      redirect('/', response.data.message, true);
      return;
    } catch (error) {
      if(error.response){
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <button className="btn btn-square btn-ghost text-red-500" onClick={()=>document.getElementById('logout_modal').showModal()}>
        <HiOutlineLogout className='text-xl' />
      </button>
      <dialog id="logout_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Warning!</h3>
          <p className="py-4 text-lg mb-4">Are you sure you want to logout this session?</p>
          <button className="btn btn-error" onClick={handleLogout}>Logout</button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button></button>
        </form>
      </dialog>
    </div>
  )
}

export default Logout