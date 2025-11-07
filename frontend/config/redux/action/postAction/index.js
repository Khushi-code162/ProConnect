import { clientServer } from "@/config"; 
import { createAsyncThunk } from "@reduxjs/toolkit";




export const getAllPosts = createAsyncThunk(
    "post/getAllPosts",
    async(_, thunkAPI) =>{
        try{

            const response = await clientServer.get('/posts')

            return thunkAPI.fulfillWithValue(response.data)

        }catch(error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const createPost = createAsyncThunk(
    "post/createPost",
    async( {file, body}, thunkAPI) =>{

        try{
            const formData = new FormData();
            formData.append('token', localStorage.getItem('token'))
            formData.append('body', body)
            formData.append('media',file)

            const response = await clientServer.post("/post", formData , {
                headers :{
                    'Content-Type' :'multipart/form-data'
                }
            });

            if(response.status === 200){
                return thunkAPI.fulfillWithValue("Post Uploaded")

            }else{
                return thunkAPI.rejectWithValue("Post not uploaded")
            }

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const deletePost = createAsyncThunk(
    "post/deletePost",
    async(post_id, thunkAPI) =>{
        try{
            const response = await clientServer.delete("/delete_post" ,{
                data:{
                    token: localStorage.getItem("token"),
                    post_id : post_id.post_id
                }
            });
            return thunkAPI.fulfillWithValue(post_id);

        }catch(error){
            return thunkAPI.rejectWithValue("Something went wrong")
        }
    }
)

export const incrementPostLike = createAsyncThunk(
    "post/incrementLike",

    async(post , thunkAPI) => {
        console.log("increment post like with :", post);
        try{
            const response = await clientServer.post(`/increment_post_likes` ,{
                post_id: post.post_id,
                        })

                        return thunkAPI.fulfillWithValue(response.data);

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);

        }
    }
)

export const getAllComments = createAsyncThunk(
    "post/getAllComments",
    async(postData, thunkAPI) =>{
        try{
            const response = await clientServer.get("/get_comments", {
                params: {
                    post_id: postData.post_id
                }
            });
            return thunkAPI.fulfillWithValue({
                comments: response.data,
                post_id: postData.post_id
            })

        }catch(error){
            return thunkAPI.rejectWithValue("Something went wrong")

        }
    }
)