import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Chat = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const [contact, setContact] = useState(location.state?.contact ?? null);
  const [chatRoomId, setChatroomId] = useState();

  const [chatbox, setChatbox] = useState()
  const [lastUpdated, setLastUpdated] = useState()

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!contact) {
      navigate('/chat');
    }
  }, [ contact, chatRoomId])
  
  // const setChatRoomId = async() => {
  //   try {
  //     if(!chatRoomId){
  //       console.log({ chatRoom: chatRoomId, userId: userInfo.id, myNumber: userInfo.phone_number, contactId: contactId, isGroup: false });
  //       const createRoom = await axios.post('http://localhost:5000/api/chat/createRoom',
  //         { userId: userInfo.id, myNumber: userInfo.phone_number, contactId: contactId, isGroup: false },
  //         { withCredentials: true }
  //       );
  //       console.log(createRoom)
  //       setChatroomId(createRoom.data.id);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const sendChat = async(e) => {
  //   e.preventDefault();
  //   try {
  //     console.log({ roomId:chatroomId, text: 'Test', media: null, senderId:userInfo.id });
  //     const chat = await axios.post('http://localhost:5000/api/chat/send',
  //       { roomId:chatroomId, text: 'Test', media: null, senderId:userInfo.id },
  //       { withCredentials: true }
  //     );
  //     console.log(chat);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // }

  // const addContact = async(e) => {
  //   e.preventDefault();
  //   try {
  //     const saveContact = await axios.post('http://localhost:5000/api/contact/save',
  //       { id: userInfo.id, contactNumber: location.state.phoneNumber },
  //       { withCredentials: true }
  //     );
  //     const createRoom = await axios.post('http://localhost:5000/api/chat/createRoom',
  //       { userId: userInfo.id, myNumber: userInfo.phone_number, contactId: saveContact.data.contact.id, isGroup: false },
  //       { withCredentials: true }
  //     );
  //     setIsContact(true);
  //     setContactId(saveContact.data.contact.id);
  //     setChatroomId(createRoom.data.id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // return (
  //   <>
  //     {/* If user is not in contact */}
  //     {isContact == false ?
  //       <div className='h-full w-full flex flex-col gap-2 mx-auto my-auto justify-center items-center'>
  //         <div className='bg-white p-5 shadow rounded-xl'>
  //           <div className="flex gap-3">
  //             <div className="my-auto">
  //               <div className="w-10 h-10 rounded-full bg-neutral-200 flex justify-center items-center">
  //                 <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" className='w-8 h-8 opacity-50 z-50' />
  //               </div>
  //             </div>
  //             <div className='flex-1'>
  //               <p className='flex justify-between'>
  //                 <span className='font-semibold'>{location.state?.name ?? null}</span>
  //               </p>
  //               <p className='text-slate-500 truncate max-w-56 text-sm'>
  //                 {location.state?.phoneNumber ?? null}
  //               </p>
  //             </div>
  //           </div>
  //           <p className='my-3 text-red-500'>This account is not on your contact!</p>
  //           <button className='btn bg-emerald-200 shadow-none w-full' onClick={addContact}>Add Now</button>
  //         </div>
  //       </div>
  //       :
  //       <div className='h-full'>{/* If user has been added to contact */}
  //         <div className='h-full w-full flex flex-col gap-2 mx-auto my-auto justify-center items-center'>
  //         Chat with: {location.state?.name ?? null}
  //         <button className='btn bg-emerald-200 shadow-none w-full' onClick={sendChat}>Send: Hello!</button>
  //         </div>
  //       </div>
  //     }
  //   </>
  // )

  return (
    console.log(contact),
    <>
      <div className="pt-20">
        Welcome to Chat
      </div>
    </>
  )
}

export default Chat