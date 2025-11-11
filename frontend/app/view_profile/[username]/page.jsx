// app/[username]/page.js
import React from 'react';
import { clientServer } from '@/config';
import DashboardLayout from '@/app/Layout/DashboardLayout/page';
import UserLayout from '@/app/Layout/UserLayout/UserLayout';
import Style from "./viewProfile.module.css";
import { BASE_URL } from '@/config';

export default async function ViewProfilePage({ params }) {
  const username = params.username; // gets value from URL [username]

  console.log("from view");
  console.group(username);

  // Fetch user profile first
  const request = await clientServer.get("/user/get_profile_based_on_username", {
    params: { username }
  });

  const response = request.data;
  console.log(response);

  const userProfile = response.profile;

  // Render the layout with fetched data
  return (
    <UserLayout>
      <DashboardLayout>
        <div className={Style.container}>
          <div className={Style.backDropContainer}>
            <img className={Style.backDrop} src={
      userProfile?.userId?.profilePicture
        ? userProfile.userId.profilePicture.startsWith("/")
          ? userProfile.userId.profilePicture
          : `${BASE_URL}/upload/${userProfile.userId.profilePicture}`
        : "/images/default.jpg"
    }alt="backdrop" />

          </div>

        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
