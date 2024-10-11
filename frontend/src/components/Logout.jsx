import React from 'react'
import { HiOutlineLogout } from 'react-icons/hi'

const Logout = () => {

  return (
    <div>
      <button className="btn btn-square btn-ghost text-red-500" onClick={()=>document.getElementById('logout_modal').showModal()}>
        <HiOutlineLogout className='text-xl' />
      </button>
      <dialog id="logout_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Warning!</h3>
          <p className="py-4 text-lg mb-4">Are you sure you want to logout this session?</p>
          <button className="btn btn-error">Logout</button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button></button>
        </form>
      </dialog>
    </div>
  )
}

export default Logout