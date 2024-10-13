import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useRedirect from '../hooks/useRedirect';

const UserLayout = () => {

  const redirect = useRedirect();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
    
    if (!userInfo) {
      redirect('/login', "You need to login first", true);
      return;
    }
    
    setName(userInfo.name);
    setPhoneNumber(userInfo.phone_number);
  }, [userInfo]);

  return (
    <div className="drawer lg:drawer-open z-40 border-r">
      <input id="main-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-neutral-100 min-h-screen">
        <Navbar/>
        <div className="px-6 py-4">
          <Outlet/>
        </div>
      </div>
      <Sidebar/>
    </div>
  )
}

export default UserLayout