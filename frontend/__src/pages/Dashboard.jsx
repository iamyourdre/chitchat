import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      Welcome to Dashboard, {userInfo?.name}!
    </>
  )
}

export default Dashboard