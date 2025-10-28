'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { getAboutUser } from '@/config/redux/action/authAction';

function Dashboard() {

  const router = useRouter();
  const dispatch = useDispatch();

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
  }, [isTokenThere])

  return (
    <h1>dashboard</h1>
  );
}

export default Dashboard;
