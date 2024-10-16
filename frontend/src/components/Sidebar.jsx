import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiCog6Tooth, HiMiniChatBubbleBottomCenterText, HiOutlineChatBubbleBottomCenterText, HiOutlineCog6Tooth, HiOutlinePhoto, HiOutlineUser, HiPhoto, HiUser, HiXMark } from "react-icons/hi2";
import { BsChatLeftQuoteFill } from "react-icons/bs";
import ChatList from './ChatList';
import { LuSearch } from 'react-icons/lu';
import PulseLoader from "react-spinners/PulseLoader";
import axios from 'axios';
import { useSelector } from 'react-redux';
import SearchList from './SearchList';

const Sidebar = () => {

  const [isChatListVisible, setIsChatListVisible] = useState(true);
  const [search, setSearch] = useState('');
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [searchResult, setSearchResult] = useState();

  const { userInfo } = useSelector((state) => state.auth);

  const handleSearchContact = async () => {
    if (!search.trim()) return;
    try {
      setIsLoadingSearch(true);

      const response = await axios.post(
        'http://localhost:5000/api/contact/search',
        { id: userInfo.id, phoneNumber: search },
        { withCredentials: true }
      );

      setIsLoadingSearch(false);
      response && setSearchResult({contact: await response.data.contact, stranger: await response.data.stranger});
    } catch (error) {
      setIsLoadingSearch(false);
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (search === '') {
      setIsChatListVisible(true);
      setSearchResult();
    } else {
      setIsChatListVisible(false);
      handleSearchContact();
    }
  }, [search]);

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
          <div>
            <button className="w-10 h-10 flex justify-center items-center">
              <BsChatLeftQuoteFill className='p-0 m-0 text-3xl inline text-center' />
            </button>
          </div>
          <div className="grow flex flex-col gap-2 justify-center items-center">
            {navItems.map((item, index) => (
              <NavLink key={index} to={item.to}>
                {({ isActive }) =>
                  isActive ? (
                    <button className="w-10 h-10 flex rounded-2xl justify-center items-center bg-emerald-200">
                      {item.activeIcon}
                    </button>
                  ) : (
                    <button className="w-10 h-10 flex justify-center items-center">
                      {item.inactiveIcon}
                    </button>
                  )
                }
              </NavLink>
            ))}
          </div>
          <div>
            <div className='w-10 h-10 rounded-full bg-neutral-100 bg-contain bg-center border' style={{ backgroundImage: `url('https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}></div>
          </div>
        </div>

        <div className="grow flex flex-col gap-1">
          <div className='navbar px-3 text-xl border-b'>
            Chat
          </div>
          <label className="input input-bordered flex items-center gap-2 focus-within:text-slate-700 hover:bg-slate-100 focus-within:bg-slate-100 outline-none mx-3 my-3">
            <input type="text" className="grow" value={search} placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            {isChatListVisible ? <LuSearch /> : <HiXMark onClick={(e) => setSearch('')}/>}
          </label>
          {isLoadingSearch && (
            <div className='mx-auto h-auto my-auto'>
              <div>
                <PulseLoader color="#6ee7b7" />
              </div>
            </div>
          )}
          {/* {searchResult && console.log(searchResult)} */}
          {searchResult && <SearchList list={searchResult}/>}
          {isChatListVisible && <ChatList />}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
