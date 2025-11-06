'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getAllPosts } from '@/config/redux/action/postAction';
import { getAboutUser,getAllUsers } from '@/config/redux/action/authAction';
import UserLayout from '../Layout/UserLayout/UserLayout';
import DashboardLayout from '../Layout/DashboardLayout/page';
import { BASE_URL } from '@/config';
import Style from "./dashboard.module.css";
import { deletePost } from '@/config/redux/action/postAction';

function Dashboard() {

  const router = useRouter();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth)

  const [isTokenThere, setIsTokenThere] = useState(false)

  const postState = useSelector((state) => state.postReducer)

  useEffect(() =>{
    if(localStorage.getItem('token') === null){
      router.push("/login")
    }
    setIsTokenThere(true)
  })

  useEffect(() => {
    if (authState.isTokenThere){
      console.log("Auth Token")
      dispatch(getAllPosts())
      dispatch(getAboutUser({ token: localStorage.getItem('token')}))
    }

    if(!authState.all_profiles_fetched) {
      dispatch(getAllUsers());
    }
  }, [authState.isTokenThere]);

  useEffect(() => {
  console.log('authState:', authState);
}, [authState.isTokenThere]);

const [postContent, setPostContent] = useState("");
const [fileContent, setFileContent] = useState();

//post handling
const handleUpload = async () =>{
  await dispatch(createPost({file: fileContent, body: postContent}));
  setPostContent("");
  setFileContent(null)
  dispatch(getAllPosts())

}

if (authState.user){


  return (
    <UserLayout>
    <DashboardLayout>
      <div className={Style.scrollComponent}>
      <div className={Style.wrapper}>
      <div className={Style.createPostContainer}>
  <img className={Style.userProfile}
    width={200}
    src={
      authState?.user?.userId?.profilePicture
        ? authState.user.userId.profilePicture.startsWith('/')
          ? authState.user.userId.profilePicture
          : `${BASE_URL}/${authState.user.userId.profilePicture}`
        : '/images/default.jpg'
    }
    alt="User profile"
  />
  <textarea onChange={(e) => setPostContent(e.target.value)} value={postContent} placeholder={"what's in your mind?"} className={Style.textareaofContent } name="" id=""></textarea>
  <label htmlFor='fileUpload'>
  <div className={Style.Fab}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>


  </div>
  </label>
  <input onChange={(e) => setFileContent(e.target.files[0])} type="file" hidden id = 'fileUpload' />
  {postContent.length >0 && 
  <div onClick={handleUpload}className={Style.uploadButton}>Post</div>
}
</div>
{postState?.posts?.map((post) => (
  <div key={post._id} className={Style.singleCard}>
    <div className={Style.singleCard__profileContainer}>
      <img
        className={Style.userProfile}
        src={
          post?.userId?.profilePicture
            ? `${BASE_URL}/${post.userId.profilePicture}`
            : '/images/default.jpg'
        }
        alt="User profile"
      />
      <div>
        <div style={{display : "flex" , gap:"1.2rem", justifyContent: "space-between" }}>
      <p style={{fontWeight: "bold"}}>{post?.userId?.name}</p>
      {
        post.userId._id === authState.user.userId._id &&(
      
      <div onClick={async() =>{
       await dispatch(deletePost({ post_id : post._id}))
       await dispatch(getAllPosts())
      }} style={{ cursor : "pointer"}}>
        <svg style={{height: "1.4em", color: "red"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</div>
)}

      </div>
      <p>@{post?.userId?.username}</p>
      <p style={{ paddingTop :"1.3rem" }}>{post.body}</p>

      <div className={Style.singleCard__image}>
        <img src={`${BASE_URL}/upload/${encodeURIComponent(post.media)}`} alt="Post media" />

      </div>
      </div>
    </div>
  </div>
))}

    
    </div>


</div>

    </DashboardLayout>
    </UserLayout>
    

  );
}else{
  return(
    <UserLayout>
      <DashboardLayout>
        <h3>Loading...</h3>
      </DashboardLayout>
    </UserLayout>
  );
}
}

export default Dashboard;
