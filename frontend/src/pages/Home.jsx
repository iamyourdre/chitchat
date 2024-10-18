import React from 'react'
import { BsChatLeftQuoteFill } from 'react-icons/bs'

const Home = () => {
  return (
    <div className='h-full w-full flex flex-col gap-2 mx-auto my-auto justify-center items-center'>
      <BsChatLeftQuoteFill className='p-0 m-0 text-6xl text-center mr-2 text-neutral-400'/>
      <p className='text-2xl font-semibold'>Welcome to ChitChat</p>
      <p>Let's start a conversation!</p>
    </div>
  )
}

export default Home