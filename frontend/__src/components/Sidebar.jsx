import React from 'react'
import { HiX } from 'react-icons/hi'

const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="main-sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu bg-white text-base-content min-h-screen w-72 p-2 gap-1 border-r lg:pt-8">
        <label htmlFor="main-sidebar" aria-label="close sidebar" className="btn btn-square btn-ghost mr-2 inline-flex lg:hidden">
          <HiX className='text-xl' />
        </label>
        <li><a href='/dashboard'>Dashboard</a></li>
        <li><a href='/profile'>Profile</a></li>
      </ul>
    </div>
  )
}

export default Sidebar