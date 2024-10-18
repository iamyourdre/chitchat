import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Chat = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const [isContact, setIsContact] = useState(location.state?.isContact ?? null);
  const [contactId, setContactId] = useState(location.state?.id);
  const { userInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (isContact == null) {
      navigate('/');
    }
  }, [isContact, contactId])

  const addContact = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact/save',
        { id: userInfo.id, contactNumber: location.state.phoneNumber },
        { withCredentials: true }
      );
      setIsContact(true);
      setContactId(response.data.id);
    } catch (error) {
      if(error.response){
        console.log(error.response.data.message);
      }
    }
  }
  
  const createChatRoom = async(e) => {
    e.preventDefault();
    try {
      console.log("check")
      console.log({ id: userInfo.id, contact_id: contactId, isGroup: false })
      const response = await axios.post('http://localhost:5000/api/chat/createRoom',
        { id: userInfo.id, contact_id: contactId, isGroup: false },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      if(error.response){
        console.log(error.response.data.message);
      }
    }
  }

  return (
    <>
      {isContact == false ?
        <div className='h-full w-full flex flex-col gap-2 mx-auto my-auto justify-center items-center'>
          <div className='bg-white p-5 shadow rounded-xl'>
            <div className="flex gap-3">
              <div className="my-auto">
                <div className="w-10 h-10 rounded-full bg-neutral-200 flex justify-center items-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" className='w-8 h-8 opacity-50 z-50' />
                </div>
              </div>
              <div className='flex-1'>
                <p className='flex justify-between'>
                  <span className='font-semibold'>{location.state?.name ?? null}</span>
                </p>
                <p className='text-slate-500 truncate max-w-56 text-sm'>
                  {location.state?.phoneNumber ?? null}
                </p>
              </div>
            </div>
            <p className='my-3 text-red-500'>This account is not on your contact!</p>
            <button className='btn bg-emerald-200 shadow-none w-full' onClick={addContact}>Add Now</button>
          </div>
        </div>
        :
        <div className='h-full w-full flex flex-col gap-2 mx-auto my-auto justify-center items-center'>
        Chat with: {location.state?.name ?? null}
        <button className='btn bg-emerald-200 shadow-none w-full' onClick={createChatRoom}>Send: Hello!</button>
        </div>
      }
    </>
  )
}

export default Chat