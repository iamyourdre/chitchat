import React from 'react'
import { NavLink } from 'react-router-dom';

const ContactList = ({list}) => {

  return (
    <div>
      {list.map((c, index) => (
          <NavLink key={index} to='/home/chat' state={{ contact: c }} className="focus:text-slate-700 focus:bg-transparent hover:bg-emerald-100 p-2 px-3 flex gap-3">
            <div className='my-auto'>
              <div className="w-10 h-10 rounded-full bg-neutral-200 flex justify-center items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" className='w-8 h-8 opacity-50 z-50' />
              </div>
            </div>
            <div className='flex-1'>
              <p className='flex justify-between'>
                <span className='font-semibold'>{c.contact_name}</span>
                {/* <span className='text-xs'>{shortTime(c.time)}</span> */}
              </p>
              <p className='text-slate-500 truncate max-w-56 text-sm'>
                {c.contact_number}
              </p>
            </div>
          </NavLink>
        ))
      }
    </div>
  )
}

export default ContactList