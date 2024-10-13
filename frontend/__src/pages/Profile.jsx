import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setPhoneNumber(userInfo.phoneNumber);
  }, [userInfo.phoneNumber, userInfo.name]);

  return (
    <>
      <p className='text-2xl'>Hi, {name}!</p>
    </>
  )
}

export default Profile