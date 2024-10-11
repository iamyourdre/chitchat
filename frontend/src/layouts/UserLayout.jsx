import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom';

const UserLayout = () => {


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