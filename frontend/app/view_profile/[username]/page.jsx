// app/[username]/page.js
'use client'
import React, { useEffect , useState }  from 'react';
import { clientServer } from '@/config';
import DashboardLayout from '@/app/Layout/DashboardLayout/page';
import UserLayout from '@/app/Layout/UserLayout/UserLayout';
import Style from "./viewProfile.module.css";
import { BASE_URL } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { useRouter } from 'next/navigation';
import { sendConnectionRequest , getConnectionRequest } from '@/config/redux/action/authAction';

export default async function ViewProfilePage({ params }) {
  const Router = useRouter();
  const postReducer = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth)

  const [userPosts, setUserPosts]= useState([]);
  const [isCurrentUserInConnection, setIsCurrentUserInConnection] = useState(false);

  const getUserPost = async () =>{
    await dispatch(getAllPosts());
    await dispatch(getConnectionRequest({token: localStorage.getItem("token")}));
  }


  useEffect(() => {
    let post = postReducer.posts.filter((post) => {
      return post.userId.username === routerServerGlobal.query.username
    })

    setUserPosts(post);
  }, [postReducer.posts])

  useEffect(() =>{
    console.log(authState.connections, userProfile.userId._id)
    if(authState.connections.some(user => user.connectionId._id === userProfile.userId._id)){
      setIsCurrentUserInConnection(true)
    }
  }, [authState.connections])


  useEffect(() =>{
    getUserPost();
  },[])

  // const username = params.username; // gets value from URL [username]

  // console.log("from view");
  // console.group(username);

  // // Fetch user profile first
  // const request = await clientServer.get("/user/get_profile_based_on_username", {
  //   params: { username }
  // });

  // const response = request.data;
  // console.log(response);

  // const userProfile = response.profile;

  

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
          <div className={Style.profileContainer__details}>
            <div style={{ display: "flex" , gap: "0.7rem" }}>
              <div style={{flex: "0.8"}}>
              <div style={{ display: "flex", width: "fit-content", alignItems: "center", gap:"1.2rem" }}>
                <h2>{userProfile.userId.name}</h2>
                <p style={{ color: "grey" }}>@userProfile.userId.username</p>

              </div>
              {isCurrentUserInConnection ?
              <button className={Style.connectedButton}>Connected</button>
              :
              <button onClick={() =>{
                dispatch(sendConnectionRequest({ token: localStorage.getItem("token"), user_id: userProfile.userId._id }))
              }} className={Style.connectBtn}>Connect</button>
            }

            <div>
              <p>{userProfile.bio}</p>
            </div>

            <div style={{flex: "0.2"}}>
              <h3>Recent Activity</h3>
              {userPosts.map((post) => {
                return (
                  <div key={post._id} className={Style.postCard}>
                  <div className={Style.card__profileContainer}>
                    {post.media !== "" ? <img src={`${BASE_URL}/${post.media}`}alt="" /> :<div style={{width: "3.4rem" , height: "3.4rem" }}></div>}

                  </div>
                  </div>
                )
              })}
            </div>

              </div>
              <div style={{ flex: "0.2" }}>

              </div>
              
            </div>
          </div>

        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
