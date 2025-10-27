import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
    "user/login",
    async(user , thunkAPI) =>{
        try{
            const response = await clientServer.post("/login",{
                email :user.email,
                password :user.password
            });

            if(response.data.token){
                localStorage.setItem("token" , response.data.token)
            }else{
                return thunkAPI.rejectWithValue({
                    message: "token not provided"
                })
            }

            return thunkAPI.fulfillWithValue(response.data.token)
        }catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/register", {
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name,
      });

      // Check if backend returned a message or token etc.
      return thunkAPI.fulfillWithValue(response.data);

    } catch (error) {
      // Ensure proper error handling
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Registration failed" }
      );
    }
  }
);
