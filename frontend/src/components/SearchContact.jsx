import React from 'react'
import { LuSearch } from "react-icons/lu";
import { useSelector } from 'react-redux';

const SearchContact = () => {
  
  const { userInfo } = useSelector((state) => state.auth);

  const handleSearch = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/api/contact/search', { id: userInfo.id, phoneNumber });
      dispatch(setCredentials(response.data || {}));
      navigate('/');
    } catch (error) {
      if(error.response){
        console.log(error.response.data.message);
        setMessage({ text: error.response.data.message, success: false });
      }
    }
  };

  return (
    <label class="input input-bordered flex items-center gap-2 focus-within:text-slate-700 hover:bg-slate-100 focus-within:bg-slate-100 outline-none mx-3 my-3">
      <input type="text" class="grow " placeholder="Search" />
      <LuSearch />
    </label>
  )
}

export default SearchContact