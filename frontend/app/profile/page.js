"use client";
import DashboardLayout from "../Layout/DashboardLayout/page";
import UserLayout from "../Layout/UserLayout/UserLayout";
import React from "react";
import Style from "./profile.module.css";
import { BASE_URL } from "@/config";
import { getAboutUser } from "@/config/redux/action/authAction";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "@/config/redux/action/postAction";
import axios from "axios";


export default function Profile() {
  const dispatch = useDispatch();

const clientServer = axios.create({
  baseURL: BASE_URL,
});


  const authState = useSelector((state) => state.auth);
  const [userProfile, setUserProfile] = useState({})
  const [userPosts, setUserPosts] = useState([]);
  const postReducer = useSelector((state) => state.postReducer);
  
  const [isModalOpen , setIsModalOpen] = useState(false);

  const [inputData, setInputData] = useState({ company: '', position: '', years:''});

  const handleWorkInputChange =(e) => {
    const {name, value } = e.target;
    setInputData({ ...inputData, [name]: value});
  }

  useEffect(() => {
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    dispatch(getAllPosts());
  }, []);
  useEffect(() =>{
     if(authState.user != undefined && !userProfile.userId) {
      setUserProfile({...authState.user })
     
      let post = postReducer.posts.filter((post) =>{
        return post?.userId?.username === authState.user.userId.username
      })
      console.log(post, authState.user.userId.username)
      setUserPosts(post);
     }

    },[authState.user])

    const updateProfilePicture = async (file) =>{
      const formData = new FormData();
      formData.append("profile_picture" , file);
      formData.append("token" , localStorage.getItem("token"));

      const response = await clientServer.post("/update_profile_picture", formData,{
        headers:{
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(getAboutUser({ token: localStorage.getItem("token")}));
    }

    const updateProfileData = async () =>{
      const request = await clientServer.post("/user_update", {
        token: localStorage.getItem("token"),
        name:userProfile.userId.name,
      });

      const response = await clientServer.post("/update_profile_data",{
        token:localStorage.getItem("token"),
        bio: userProfile.bio,
        currentPost : userProfile.currentPost,
        pastwork : userProfile.pastwork,
        education : userProfile.education

      });

      dispatch(getAboutUser({ token: localStorage.getItem("token")}));
    }
  return (
    <UserLayout>
      <DashboardLayout>
        {authState.user && userProfile.userId && (
          <div className={Style.container}>
            <div className={Style.backDropContainer}>
              <label htmlFor='profilePictureUpload' className={Style.backDrop__overlay}>
                <p>Edit</p>
              </label>
              <input onChange={(e) =>{
                updateProfilePicture(e.target.files[0])
              }}hidden type="file" id='profilePictureUpload' />
              <img
                src={
                  userProfile.userId?.profilePicture
                    ? `${BASE_URL}/upload/${userProfile.userId.profilePicture}`
                    : "/images/default.jpg"
                }
                alt=""
              />
            </div>
            <div className={Style.profileContainer__details}>
              <div style={{ display: "flex", gap: "0.7rem" }}>
                <div style={{ flex: "0.8" }}>
                  <div
                    style={{
                      display: "flex",
                      width: "fit-content",
                      alignItems: "center",
                      gap: "1.2rem",
                    }}
                  >
                    <input className={Style.nameEdit} type="text" value={userProfile.userId.name} onChange={(e) =>{
                      setUserProfile({ ...userProfile, userId : {...userProfile.userId, name: e.target.value}})
                    }} />
                    <p style={{ color: "grey" }}>
                      @{userProfile.userId.username}
                    </p>
                  </div>

                  <div>
                    <textarea
                      value={userProfile.bio}
                      onChange={(e) =>{
                        setUserProfile({ ...userProfile, bio: e.target.value });
                      }}
                    rows={Math.max(3 , Math.ceil(userProfile.bio.length / 80))}
                    style={{ width: "100%"}}
                    />
                  </div>

                
                <div className="workHistory">
              <h4>workHistory</h4>
              <div className={Style.workHistoryContainer}>
                {
                  userProfile.pastwork.map((work, index) =>{
                    return(
                      <div key={index} className={StyleSheet.workHistoryCard}>
                        <p style={{ fontweight : "bold", display: "flex"}}>{work.company}</p>
                        <p>{work.years}</p>
                        </div>
                    )
                  })
                }
                <button className={Style.addWorkBtn} onClick={() =>{
                setIsModalOpen(true)
                }}>Add work</button>
              </div>
            </div>
            </div>
                {/*recent activity */}
                <div style ={{flex : "0.2"}}>
                  <h3>Recent Activity</h3>
                  {userPosts
                  .filter((post) =>post)
                  .map((post) =>{
                    return(
                      <div key={post.id} className={Style.postCard}>
                        <div className={Style.card}>
                          <div className={Style.card__profileContainer}>

                            {post.media !== "" ? (
                              <img
                               src={`${BASE_URL}/upload/${post.media}`}
                               alt ="post media" 
                               />
                  ) : (
                    <p>No media</p>
                  )}
                            </div>
                            <p>{post.body}</p>
                          </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* <div className="workHistory">
              <h4>workHistory</h4>
              <div className={Style.workHistoryContainer}>
                {
                  userProfile.pastwork.map((work, index) =>{
                    return(
                      <div key={index} className={StyleSheet.workHistoryCard}>
                        <p style={{ fontweight : "bold", display: "flex"}}>{work.company}</p>
                        <p>{work.years}</p>
                        </div>
                    )
                  })
                }
                <button className={Style.addWorkBtn} onClick={() =>{
                setIsModalOpen(true)
                }}>Add work</button>
              </div>
            </div> */}
            {JSON.stringify(userProfile) !== JSON.stringify(authState.user) && 
            <div onClick ={() =>{
              updateProfileData();

            }}
            className={Style.updateProfileBtn}>
              Update Profile
              </div>
              }
          </div>
        )}

        {
            isModalOpen && 
            <div
              onClick={() => {
                setIsModalOpen(false)
              }}
              className = {Style.commentsContainer}>
                <div
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className={Style.allCommentsContainer}>

                     <input onChange={handleWorkInputChange} name='company' className={Style.inputField} type="text" placeholder="Enter Company" /> 
                     <input onChange={handleWorkInputChange} name='position' className={Style.inputField} type="text" placeholder="Enter Position" /> 
                     <input onChange={handleWorkInputChange} name='years' className={Style.inputField} type="number" placeholder="Years" /> 
                     <div onClick={() =>{
                      setUserProfile({ ...userProfile, pastwork: [...userProfile.pastwork, inputData] })
                      setIsModalOpen(false)
                     }} className= {Style.updateProfileBtn}>Add work</div>



                </div>
              </div>
        }
      </DashboardLayout>
    </UserLayout>
  );
}
