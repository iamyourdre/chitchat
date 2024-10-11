import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineXCircle } from "react-icons/hi";
import axios from "axios";
import Alert from "../components/Alert";
import { setCredentials } from "../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState({ text: "", success: "" });

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', { email, password });
      dispatch(setCredentials(response.data || {}));
      navigate('/');
    } catch (error) {
      if(error.response){
        console.log(error.response.data.msg);
        setMsg({ text: error.response.data.msg, success: false });
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
      return;
    }
  }, [userInfo]);

  return (
    <div className="h-screen">
      <div className="h-full content-center px-8">
        <form onSubmit={handleLogin} className="rounded-xl w-full md:w-80 py-6 grid gap-3 mx-auto">
          <p className="text-2xl text-center mb-4 font-semibold">Login</p>
          
          <Alert message={msg.text ? msg : location.state?.text ? location.state : ''}/>

          <label className="input input-bordered flex items-center gap-2">
            <HiOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
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
