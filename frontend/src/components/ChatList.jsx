import React from 'react'
import { dummyChat } from '../dummy/chats';
import { NavLink, useLocation } from 'react-router-dom';

const ChatList = () => {
  
  const location = useLocation(); 
  const isActive = (path) => location.pathname === path;
  const shortTime = (t) => {
    const timeObj = new Date(t);
    const time = timeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return time;
  }

  return (
    <div>
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
  )
}

export default ChatList