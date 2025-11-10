// app/[username]/page.js
import React from 'react';
import { clientServer } from '@/config';

export default async function ViewProfilePage({ params }) {
  const username = params.username; // gets value from URL [username]

  console.log("from view");
  console.group(username);

  // Fetch user profile
  const request = await clientServer.get("/user/get_profile_based_on_username", {
    params: { username }
  });

  const response = request.data;
  console.log(response);

  const userProfile = response.profile;

  return (
    <div>{userProfile.userId.name}</div>
  );
}
