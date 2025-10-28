'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Dashboard() {

  const router = useRouter();

  useEffect(() =>{
    if(localStorage.getItem('token') === null)
      router.push("/login")
  })

  return (
    <h1>dashboard</h1>
  );
}

export default Dashboard;
