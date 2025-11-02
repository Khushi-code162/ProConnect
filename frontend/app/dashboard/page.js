'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { getAboutUser } from '@/config/redux/action/authAction';
import UserLayout from '../Layout/UserLayout/UserLayout';
import DashboardLayout from '../Layout/DashboardLayout/page';

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
    if (isTokenThere){
      dispatch(getAllPosts())
      dispatch(getAboutUser({ token: localStorage.getItem('token')}))
    }
  }, [isTokenThere]);

  useEffect(() => {
  console.log('authState:', authState);
}, [authState]);


  return (
    <UserLayout>
    <DashboardLayout>
      <h1>Dashboard</h1>
    </DashboardLayout>
    </UserLayout>
  );
}

export default Dashboard;
