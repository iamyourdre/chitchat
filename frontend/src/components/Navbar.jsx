import React from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
import Logout from './Logout'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 border-b pl-2 lg:pl-6">
      <div className="flex-none">
        <label htmlFor="main-sidebar" aria-label="close sidebar" className="btn btn-square btn-ghost mr-2 inline-flex drawer-button lg:hidden">
          <HiOutlineMenu className='text-xl' />
        </label>
      </div>
      <div className="flex-1">
        <a className="font-semibold text-xl">MERN</a>
      </div>
      <div className="flex-none">
        <Logout/>
      </div>
    </div>
  )
}

export default Navbar