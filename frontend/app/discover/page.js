'use client'
import React, {useEffect} from 'react'
import DashboardLayout from '../Layout/DashboardLayout/page';
import UserLayout from '../Layout/UserLayout/UserLayout';
import { useSelector,useDispatch } from 'react-redux';
import { getAllUsers } from '@/config/redux/action/authAction';

function DiscoverPage ()  {

  const authState = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  useEffect(() => {
    if(!authState.all_profile_fetched) {
        dispatch(getAllUsers());
    }
  }, [])
  return (
    <UserLayout>
    <DashboardLayout>
      <h1>Discover page</h1>
    </DashboardLayout>
    </UserLayout>

  );
}

export default DiscoverPage