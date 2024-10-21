import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserLayout = () => {

  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
    
    if (!userInfo) {
      navigate('/');
      return;
    }
    
    setName(userInfo.name);
    setPhoneNumber(userInfo.phone_number);
  }, [userInfo]);

  return (
    <div className="drawer lg:drawer-open z-40 border-r">
      <input id="main-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-neutral-100 h-screen">
        <Navbar/>
        <div className="px-6 h-full">
          <Outlet/>
        </div>
      </div>
      <Sidebar/>
    </div>
  )
}

export default UserLayout