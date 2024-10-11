import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  return (
    <>
      <p className='text-2xl'>Hi, {name}!</p>
    </>
  )
}

export default Profile