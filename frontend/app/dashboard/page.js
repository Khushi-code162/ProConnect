'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { getAboutUser,getAllUsers } from '@/config/redux/action/authAction';
import UserLayout from '../Layout/UserLayout/UserLayout';
import DashboardLayout from '../Layout/DashboardLayout/page';
import { BASE_URL } from '@/config';
import Style from "./dashboard.module.css"

function Dashboard() {

  const router = useRouter();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth)

  const [isTokenThere, setIsTokenThere] = useState(false)

  useEffect(() =>{
    if(localStorage.getItem('token') === null){
      router.push("/login")
    }
    setIsTokenThere(true)
  })

  useEffect(() => {
    if (authState.isTokenThere){
      console.log("Auth Token")
      dispatch(getAllPosts())
      dispatch(getAboutUser({ token: localStorage.getItem('token')}))
    }

    if(!authState.all_profiles_fetched) {
      dispatch(getAllUsers());
    }
  }, [authState.isTokenThere]);

  useEffect(() => {
  console.log('authState:', authState);
}, [authState.isTokenThere]);

if (authState.user){


  return (
    <UserLayout>
    <DashboardLayout>
     <div className={Style.createPostContainer}>
  <img
    width={200}
    src={
      authState?.user?.userId?.profilePicture
        ? authState.user.userId.profilePicture.startsWith('/')
          ? authState.user.userId.profilePicture
          : `${BASE_URL}/${authState.user.userId.profilePicture}`
        : '/images/profile.jpg'
    }
    alt="User profile"
  />
  <textarea name="" id=""></textarea>
  <label htmlFor='fileUpload'>
  <div className='Fab'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>


  </div>
  </label>
  <input type="file" hidden id = 'fileUpload' />
</div>

    </DashboardLayout>
    </UserLayout>

  );
}else{
  return(
    <UserLayout>
      <DashboardLayout>
        <h3>Loading...</h3>
      </DashboardLayout>
    </UserLayout>
  );
}
}

export default Dashboard;
