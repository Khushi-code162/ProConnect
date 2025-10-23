const { createSlice } =require("@reduxjs/toolkit")

const initialState ={
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn :false,
    message: "",
    profileFetched: false,
    connections:[],
    connectionRequest:[]
}

const authSlice = createSlice({
    name :"auth",
    initialState,
    reducer: {
        reset:() => initialState,
        handleLoginUser: (state) =>{
            state.message ="hello"
        }
    },

    extraReducers :(builder) =>{
        builder.addCase(loginUser.pending ,(state) => {
            state.isLoading = true;
            state.message = "Knoocking the door...."
        })
        .addCase(loginUser.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess= true;
            state.loggedIn = true;
            state.message = "Login is successfull"
        })
        .addCase(loginUser.rejected, (state,action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
    }
})
.addCase(registerUser.pending , (state) =>{
    state.isLoading = true;
    state.message = "registering you..."
})
.addCase(registerUser.fullfilled, (state, action) =>{
    state.isLoading= false;
    state.isError = false;
    state.isSuccess = true;
    state.loggedIn = true;
    state.message =" Registration is sucessfull"

})
.addCase(registerUser.rejected, (state , action) =>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload
})

export default authSlice.reducer