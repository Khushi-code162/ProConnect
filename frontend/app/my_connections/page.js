'use client'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Style from "./my_connection.module.css";
import UserLayout from '../Layout/UserLayout/UserLayout';
import DashboardLayout from '../Layout/DashboardLayout/page';
import { BASE_URL } from '@/config';
import { getMyConnectionsRequest } from '@/config/redux/action/authAction/index';

export default function MyConnectionPage() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyConnectionsRequest({ token: localStorage.getItem("token") }));
  }, [dispatch]);

  return (
    <UserLayout>
      <DashboardLayout>
        <div>
          <h1>My Connections</h1>

          {authState.connectionRequest && authState.connectionRequest.length !== 0 &&
            authState.connectionRequest.map((user, index) => {
              return (
                <div className={Style.userCard} key={index}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className={Style.profilePicture}>
                      <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt="" />
                    </div>
                    <div className={Style.userInfo}>
                      <h3>{user.userId.name}</h3>
                      <p>{user.userId.username}</p>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </DashboardLayout>
    </UserLayout>
  )
}
