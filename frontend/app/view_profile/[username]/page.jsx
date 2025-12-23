'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import DashboardLayout from '@/app/Layout/DashboardLayout/page';
import UserLayout from '@/app/Layout/UserLayout/UserLayout';
import Style from "./viewProfile.module.css";
import { BASE_URL, clientServer } from '@/config';
import { getAllPosts } from '@/config/redux/action/postAction';
import { sendConnectionRequest, getConnectionsRequest } from '@/config/redux/action/authAction/index.js';

export default function ViewProfilePage({ params }) {
  const { username } = React.use(params);
  const dispatch = useDispatch();
  const postReducer = useSelector(state => state.postReducer);
  const authState = useSelector(state => state.auth);
  const Router = useRouter();

  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isCurrentUserInConnection, setIsCurrentUserInConnection] = useState(false);
  const [isConnectionNull, setIsConnectionNull] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoadingProfile(true);
        const res = await clientServer.get(`/user/get_profile_based_on_username`, { params: { username } });
        setUserProfile(res.data.profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, [username]);
  

  // Fetch posts and connections
  useEffect(() => {
    const fetchPostsAndConnections = async () => {
      try {
        setLoadingPosts(true);
        dispatch(getAllPosts());
        dispatch(getConnectionsRequest({ token: localStorage.getItem("token") }));
      } catch (err) {
        console.error("Error fetching posts or connections:", err);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPostsAndConnections();
  }, [dispatch]);

  // Filter posts for the user
  useEffect(() => {
    if (!postReducer.posts) return;
    const filteredPosts = postReducer.posts.filter(post => post.userId.username === username);
    setUserPosts(filteredPosts);
  }, [postReducer.posts, username]);

  // Check connection status
  useEffect(() => {
    if (!userProfile) return;
    const connection = authState.connections.find(c => c.connectionId._id === userProfile.userId._id);
    if (connection) {
      setIsCurrentUserInConnection(true);
      setIsConnectionNull(connection.status_accepted !== "true");
    } else {
      setIsCurrentUserInConnection(false);
      setIsConnectionNull(true);
    }
  }, [authState.connections, userProfile]);

  // Handle sending connection request
  const handleConnect = () => {
    if (!userProfile) return;
    dispatch(sendConnectionRequest({
      token: localStorage.getItem("token"),
      user_id: userProfile.userId._id
    }));
    setIsConnectionNull(false);
  };

  // Handle resume download
  const handleDownloadResume = async () => {
    if (!userProfile?.userId?._id) return;
    try {
const response =  await clientServer.get(`/user/download_resume?user_id=${userProfile.userId._id}`
);
      window.open(`${BASE_URL}/${response.data.message}`, "_blank");
    } catch (err) {
      console.error("Resume download error:", err);
    }
  };

  if (loadingProfile) return <p>Loading profile...</p>;

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={Style.container}>
          <div className={Style.backDropContainer}>
            <img
              className={Style.backDrop}
              src={
                userProfile?.userId?.profilePicture
                  ? userProfile.userId.profilePicture.startsWith("/")
                    ? userProfile.userId.profilePicture
                    : `${BASE_URL}/upload/${userProfile.userId.profilePicture}`
                  : "/images/default.jpg"
              }
              alt="backdrop"
            />
          </div>

          <div className={Style.profileContainer__details}>
            <div style={{ display: "flex", gap: "0.7rem" }}>
              <div style={{ flex: "0.8" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <h2>{userProfile?.userId?.name}</h2>
                  <p style={{ color: "grey" }}>{userProfile?.userId?.username}</p>
                </div>

                <div className="workHistory">
                  <h4>Work History</h4>
                  <div className={Style.workHistroyContainer}>
                    {userProfile?.pastwork?.map((work, index) => (
                      <div key={index} className={Style.workHistoryCard}>
                        <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.8rem" }}>
                          {work.company} - {work.position}
                        </p>
                        <p>{work.years}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginTop: "1rem" }}>
                  {userProfile && !isCurrentUserInConnection ? (
                    <button className={Style.connectBtn} onClick={handleConnect}>
                      {isConnectionNull ? "Connect" : "Pending"}
                    </button>
                  ) : (
                    <button className={Style.connectedButton}>Connected</button>
                  )}

                  <div onClick={handleDownloadResume} style={{ cursor: "pointer" }}>
                    <svg
                      style={{ width: "1.2rem" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                  </div>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <p>{userProfile?.bio}</p>
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <h3>Recent Activity</h3>
                  {loadingPosts ? (
                    <p>Loading posts...</p>
                  ) : (
                    userPosts.map(post => (
                      <div key={post._id} className={Style.postCard}>
                        <div className={Style.card__profileContainer}>
                          {post.media ? (
                            <img src={`${BASE_URL}/${post.media}`} alt="post media" />
                          ) : (
                            <div style={{ width: "3.4rem", height: "3.4rem" }}></div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div style={{ flex: "0.2" }}></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
