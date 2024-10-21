import { useEffect, useState } from "react";
import { HiOutlineLockClosed, HiOutlineUser, HiPhone } from "react-icons/hi";
import axios from "axios";
import useRedirect from "../hooks/useRedirect";
import Alert from "../components/Alert";
import useCountryCodes from "../hooks/useCountryCodes";

const Register = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState({ text: "", success: "" });
  const [countryCode, setCountryCode] = useState("+62");
  
  const { countryCodes } = useCountryCodes();
  const redirect = useRedirect();

  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      if (password !== confPassword) {
        setMessage({text:"Passwords do not match!", success:false});
        return;
      }
      if (password.length < 6) {
        setMessage({text:"Password needs to be at least 6 characters long", success:false});
        return;
      }
      const fullPhoneNumber = countryCode + phoneNumber;
      const response = await axios.post('http://localhost:5000/api/user/register', { name, phone_number: fullPhoneNumber, password });
      redirect('/', response.data.message, true);
    } catch (error) {
      if(error.response){
        console.log(error.response.data.message);
        setMessage({text:error.response.data.message, success:false});
      }
    }
  };

  return (
    <div className="h-screen">
      <div className="h-full content-center px-8">
        <form onSubmit={handleRegister} className="rounded-xl w-full md:w-80 py-6 grid gap-3 mx-auto">
          <p className="text-2xl text-center mb-4 font-semibold">Register</p>
          
          <Alert message={message}/>

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
          <p>Already have an account? <a href="/" className="link">Login</a></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
