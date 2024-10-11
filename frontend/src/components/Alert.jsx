import React from 'react'
import { HiOutlineXCircle } from 'react-icons/hi'

const Alert = ({ message }) => {

  return (
    <div>
      {message.text ? (
        <div role="alert" className={`alert ${message.success?'bg-green-400':'alert-error'} mb-4 flex`}>
          <HiOutlineXCircle className='text-2xl' />
          <span>{message.text}</span>
        </div>
      ) : ''}
    </div>
  )
}

export default Alert
