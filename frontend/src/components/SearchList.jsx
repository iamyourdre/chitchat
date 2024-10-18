import React from 'react'
import { NavLink } from 'react-router-dom';

const SearchList = ({list}) => {
  console.log(list);

  return (
    <div>
      {list.contact ?
      
        list.contact.map((c, index) => (
          <NavLink key={index} to='/chat' state={{ id: c.id, name:c.contact.name, phoneNumber:c.contact.phone_number, isContact: true }} className="focus:text-slate-700 focus:bg-transparent hover:bg-emerald-100 p-2 px-3 flex gap-3">
            <div className='my-auto'>
              <div className="w-10 h-10 rounded-full bg-neutral-200 flex justify-center items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" className='w-8 h-8 opacity-50 z-50' />
              </div>
            </div>
            <div className='flex-1'>
              <p className='flex justify-between'>
                <span className='font-semibold'>{c.contact.name}</span>
                {/* <span className='text-xs'>{shortTime(c.time)}</span> */}
              </p>
              <p className='text-slate-500 truncate max-w-56 text-sm'>
                {c.contact.phone_number}
              </p>
            </div>
          </NavLink>
        ))

        : list.stranger ?
        <NavLink to='/chat' state={{ id:null, name:list.stranger.name, phoneNumber:list.stranger.phone_number, isContact: false }} className="focus:text-slate-700 focus:bg-transparent hover:bg-emerald-100 p-2 px-3 flex gap-3">
          <div className='my-auto'>
            <div className="w-10 h-10 rounded-full bg-neutral-200 flex justify-center items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" className='w-8 h-8 opacity-50 z-50' />
            </div>
          </div>
          <div className='flex-1'>
            <p className='flex justify-between'>
              <span className='font-semibold'>{list.stranger.name}</span>
              {/* <span className='text-xs'>{shortTime(c.time)}</span> */}
            </p>
            <p className='text-slate-500 truncate max-w-56 text-sm'>
              {list.stranger.phone_number}
            </p>
          </div>
        </NavLink>

        : ''
      }
    </div>
  )
}

export default SearchList