import { useState } from "react";
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineUser, HiOutlineXCircle } from "react-icons/hi";
import axios from "axios";
import useRedirect from "../hooks/useRedirect";
import Alert from "../components/Alert";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState({ text: "", success: "" });
  
  const redirect = useRedirect();

  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      if (password !== confPassword) {
        setMsg({text:"Passwords do not match!", success:false});
        return;
      }
      if (password.length < 6) {
        setMsg({text:"Password needs to be at least 6 characters long", success:false});
        return;
      }
      const response = await axios.post('http://localhost:5000/api/user/register', { name, email, password });
      redirect('/login', response.data.msg, true);
    } catch (error) {
      if(error.response){
        console.log(error.response.data.msg);
        setMsg({text:error.response.data.msg, success:false});
      }
    }
  };

  return (
    <div className="h-screen">
      <div className="h-full content-center px-8">
        <form onSubmit={handleRegister} className="rounded-xl w-full md:w-80 py-6 grid gap-3 mx-auto">
          <p className="text-2xl text-center mb-4 font-semibold">Register</p>
          
          <Alert message={msg}/>

          <label className="input input-bordered flex items-center gap-2">
            <HiOutlineUser />
            <input
              type="text"
              className="grow"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
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
          <label className="input input-bordered flex items-center gap-2">
            <HiOutlineLockClosed />
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </label>
          <button className="btn btn-neutral" type="submit">Register</button>
          <p>Already have an account? <a href="/login" className="link">Login</a></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
