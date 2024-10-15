import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { HiCog6Tooth, HiMiniChatBubbleBottomCenterText, HiOutlineChatBubbleBottomCenterText, HiOutlineCog6Tooth, HiOutlinePhoto, HiOutlineUser, HiPhoto, HiUser } from "react-icons/hi2";
import { BsChatLeftQuoteFill } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import ChatList from './ChatList';
import SearchContact from './SearchContact';

const Sidebar = () => {

  const navItems = [
    { to: "/", activeIcon: <HiMiniChatBubbleBottomCenterText className='text-xl text-emerald-800' />, inactiveIcon: <HiOutlineChatBubbleBottomCenterText className='text-2xl' /> },
    { to: "/profile", activeIcon: <HiUser className='text-xl text-emerald-800' />, inactiveIcon: <HiOutlineUser className='text-2xl' /> },
    { to: "/settings", activeIcon: <HiCog6Tooth className='text-xl text-emerald-800' />, inactiveIcon: <HiOutlineCog6Tooth className='text-2xl' /> },
    { to: "/media", activeIcon: <HiPhoto className='text-xl text-emerald-800' />, inactiveIcon: <HiOutlinePhoto className='text-2xl' /> }
  ];

  return (
    <div className="drawer-side">
      <label htmlFor="main-sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className='bg-white text-base-content min-h-screen w-96 border-r flex flex-row'>

        <div className='border-r p-4 flex flex-col m-0'>

          <div className=''>
            <button className="w-10 h-10 flex justify-center items-center">
              <BsChatLeftQuoteFill className='p-0 m-0 text-3xl inline text-center' />
            </button>
          </div>

          <div className="grow flex flex-col gap-2 justify-center items-center">
            {navItems.map((item, index) => (
              <NavLink key={index} to={item.to}>
                {({ isActive }) =>
                  isActive ?
                    <button className="w-10 h-10 flex rounded-2xl justify-center items-center bg-emerald-200">
                      {item.activeIcon}
                    </button>
                    :
                    <button className="w-10 h-10 flex justify-center items-center">
                      {item.inactiveIcon}
                    </button>
                }
              </NavLink>
            ))}
          </div>

          <div className=''>
            <div className='w-10 h-10 rounded-full bg-neutral-100 bg-contain bg-center border' style={{ backgroundImage: `url('https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}></div>
          </div>
          
        </div>

        <div className="grow flex flex-col gap-1">
          <div className='navbar px-3 text-xl border-b'>
            Chat
          </div>
          <SearchContact />
          <ChatList/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar