import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { dummyChat } from '../dummy/chats';
import { HiX } from 'react-icons/hi'
import { HiCog6Tooth, HiMiniChatBubbleBottomCenterText, HiOutlineChatBubbleBottomCenterText, HiOutlineCog6Tooth, HiOutlinePhoto, HiOutlineUser, HiPhoto, HiUser } from "react-icons/hi2";
import { BsChatLeftQuoteFill } from "react-icons/bs";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  
  const location = useLocation(); 
  const isActive = (path) => location.pathname === path;

  const shortTime = (t) => {
    const timeObj = new Date(t);
    const time = timeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return time;
  }

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

          <NavLink to="">
              {({ isActive }) =>
                isActive ?
              <button className="w-10 h-10 flex rounded-2xl justify-center items-center bg-emerald-200">
                <HiMiniChatBubbleBottomCenterText className='text-xl text-emerald-800'/>
              </button>
                :
                <button className="w-10 h-10 flex justify-center items-center">
                  <HiOutlineChatBubbleBottomCenterText className='text-2xl'/>
                </button>
              }
            </NavLink>

            <NavLink to="/profile">
              {({ isActive }) =>
                isActive ?
                <button className="w-10 h-10 flex rounded-2xl justify-center items-center bg-emerald-200">
                  <HiUser className='text-xl text-emerald-800'/>
                </button>
                :
                <button className="w-10 h-10 flex justify-center items-center">
                  <HiOutlineUser className='text-2xl'/>
                </button>
              }
            </NavLink>

            <NavLink to="/settings">
              {({ isActive }) =>
                isActive ?
                <button className="w-10 h-10 flex rounded-2xl justify-center items-center bg-emerald-200">
                  <HiCog6Tooth className='text-xl text-emerald-800'/>
                </button>
                :
                <button className="w-10 h-10 flex justify-center items-center">
                  <HiOutlineCog6Tooth className='text-2xl'/>
                </button>
              }
            </NavLink>

            <NavLink to="/media">
              {({ isActive }) =>
                isActive ?
                <button className="w-10 h-10 flex rounded-2xl justify-center items-center bg-emerald-200">
                  <HiPhoto className='text-xl text-emerald-800'/>
                </button>
                :
                <button className="w-10 h-10 flex justify-center items-center">
                  <HiOutlinePhoto className='text-2xl'/>
                </button>
              }
            </NavLink>

          </div>

          <div className=''>
            <div className='w-10 h-10 rounded-full bg-neutral-100 bg-contain bg-center border' style={{ backgroundImage: `url('https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}></div>
          </div>
          
        </div>

        <div className="grow flex flex-col gap-1 lg:pt-8">
          
          {dummyChat.map((person, index) => (
            <NavLink to='/' className="focus:text-slate-700 focus:bg-transparent hover:bg-emerald-100 p-2 px-3 flex gap-3">
              <div className='my-auto'>
                <div className='w-10 h-10 rounded-full bg-neutral-100 bg-contain bg-center' style={{ backgroundImage: `url(${person.pp})` }}></div>
              </div>
              <div className='flex-1'>
                <p className='flex justify-between'>
                  <span className='font-semibold'>{person.name}</span>
                  <span className='text-xs'>{shortTime(person.time)}</span>
                </p>
                <p className='text-slate-500 truncate max-w-56 text-sm'>
                  {person.chat[0].text}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar