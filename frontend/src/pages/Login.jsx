import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineLockClosed, HiPhone } from "react-icons/hi";
import axios from "axios";
import Alert from "../components/Alert";
import { setCredentials } from "../slices/authSlice";
import useCountryCodes from "../hooks/useCountryCodes";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: "", success: "" });
  const [countryCode, setCountryCode] = useState("+62");

  const { userInfo } = useSelector((state) => state.auth);
  const { countryCodes } = useCountryCodes();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const fullPhoneNumber = countryCode + phoneNumber;
      const response = await axios.post('http://localhost:5000/api/user/login',
        { phone_number: fullPhoneNumber, password },
        { withCredentials: true }
      );
      dispatch(setCredentials(response.data || {}));
      navigate('/chat');
    } catch (error) {
      if(error.response){
        console.log(error.response.data.message);
        setMessage({ text: error.response.data.message, success: false });
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/chat');
      return;
    }
  }, [userInfo]);

  return (
    <div className="h-screen">
      <div className="h-full content-center px-8">
        <form onSubmit={handleLogin} className="rounded-xl w-full md:w-80 py-6 grid gap-3 mx-auto">
          <p className="text-2xl text-center mb-4 font-semibold">Login</p>
          
          <Alert message={message.text ? message : location.state?.text ? location.state : ''}/>

          <label className="input input-bordered flex items-center gap-3">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className=""
            >
              {countryCodes.map((country, index) => (
                <option key={index} value={country.code}>
                  ({country.code}) 
                </option>
              ))}
            </select>
            <input
              type="number"
              className="grow"
              placeholder="Phone Number"
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <HiOutlineLockClosed />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="btn btn-neutral" type="submit">Login</button>
          <p>Don't have an account? <a href="/register" className="link">Register</a></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
