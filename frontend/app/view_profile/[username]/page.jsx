'use client'
import React, { useEffect , useState }  from 'react';
import { clientServer } from '@/config';
import DashboardLayout from '@/app/Layout/DashboardLayout/page';
import UserLayout from '@/app/Layout/UserLayout/UserLayout';
import Style from "./viewProfile.module.css";
import { BASE_URL } from '@/config';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { useRouter } from 'next/navigation';
import { sendConnectionRequest , getConnectionsRequest } from '@/config/redux/action/authAction/index.js';

export default function ViewProfilePage({ params }) {
  const Router = useRouter();
  const postReducer = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth)
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts]= useState([]);
  const [isCurrentUserInConnection, setIsCurrentUserInConnection] = useState(false);

  const [isConnectionNull, setIsConnectionNull] = useState(true);

  const getUserPost =  () =>{
     dispatch(getAllPosts());
    dispatch(getConnectionsRequest({token: localStorage.getItem("token")}));
  }


  useEffect(() => {
    let post = postReducer.posts.filter((post) => {
      return post.userId.username === username;
    })

    setUserPosts(post);
  }, [postReducer.posts])

  useEffect(() =>{
    console.log(authState.connections, userProfile?.userId._id)
    if(authState.connections.some(user => user.connectionId._id === userProfile.userId._id)){
      setIsCurrentUserInConnection(true)
      if(authState.connections.find(user => user.connectionId._id === userProfile.userId._id).status_accepted === "true"){
        setIsConnectionNull(false)
      }
    }
  }, [authState.connections])


  useEffect(() =>{
    getUserPost();
  },[])

  const {username} = React.use(params); 

  console.log("from view");


  // Fetch user profile first
  // Inside useEffect
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await clientServer.get(`/user/get_profile_based_on_username`, { params: { username } });
      setUserProfile(res.data.profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  fetchProfile();
}, [username]);


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
                <h2>{userProfile?.userId?.name}</h2>
                <p style={{ color: "grey" }}>{userProfile?.userId?.username}</p>

              </div>
              <div className = "workHistory">
                 <h4>work history</h4>
                 <div className={Style.workHistroyContainer}>{
                  userProfile?.pastwork?.map((work, index) =>{
                    return ( 
                      <div key={index} className={Style.workHistoryCard}>
                        <p style={{ fontWeight: "bold" , display: "flex", alignItems: "center", gap: "0.8"}}>{work.company}-{work.position}</p>
                        <p>{work.years}</p>
                        </div>
                    )
                  })}

                 </div>
              </div>
              {userProfile && !isCurrentUserInConnection ? (
  <button
    className={Style.connectBtn}
    onClick={() => {
      dispatch(sendConnectionRequest({
        token: localStorage.getItem("token"),
        connectionId: userProfile.userId._id
      }));
      setIsConnectionNull(false);
    }}
  >
    {isConnectionNull ? "Connect" : "Pending"}
  </button>
) : (
  <button className={Style.connectedButton}>Connected</button>
)}


            <div>
              <p>{userProfile?.bio}</p>
            </div>

            <div style={{flex: "0.2"}}>
              <h3>Recent Activity</h3>
              {userPosts.map((posts) => {
                return (
                  <div key={posts._id} className={Style.postCard}>
                  <div className={Style.card__profileContainer}>
                    {posts.media !== "" ? <img src={`${BASE_URL}/${posts.media}`}alt="" /> :<div style={{width: "3.4rem" , height: "3.4rem" }}></div>}

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
