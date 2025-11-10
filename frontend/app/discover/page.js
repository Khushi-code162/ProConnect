"use client";
import React, { useEffect } from "react";
import DashboardLayout from "../Layout/DashboardLayout/page";
import UserLayout from "../Layout/UserLayout/UserLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "@/config/redux/action/authAction";
import { BASE_URL } from "@/config";
import Style from "./discover.module.css";
function DiscoverPage() {
  const authState = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!authState.all_profile_fetched) {
      dispatch(getAllUsers());
    }
  }, []);
  return (
    <UserLayout>
      <DashboardLayout>
        <h1>Discover page</h1>
        <div className={Style.allUSerProfile}>
          {authState.all_profiles_fetched &&
            authState.all_users.map((user) => {
              return (
                <div key={user._id} className={Style.userCard}>
                  <img className={Style.userCard__image}
                    src={
                      user.userId?.profilePicture
                        ? `${BASE_URL}/${user.userId.profilePicture}`
                        : "/images/default.jpg"
                    }
                    alt="profile"
                  />{" "}
                  <div>
                  <h1>{user.userId.name}</h1>
                  <p>{user.userId.username}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}

export default DiscoverPage;
