import React from 'react';
import { useSelector } from 'react-redux';

import Profile from '../components/Profile';

function ProfilePage() {
    const {userInfo} = useSelector((state)=>state.auth);
  return (
    <div>
        {userInfo?<Profile user={userInfo}/>:<p/>}
    </div>
    
  )
}

export default ProfilePage