'use client';
import UserLayout from "../Layout/UserLayout/UserLayout"
import { useRouter } from 'next/navigation';
import React , { useEffect, useState }  from 'react'
import { useSelector , useDispatch } from 'react-redux'
import Styles from './login.module.css';
import { loginUser, registerUser  } from "@/config/redux/action/authAction";
import { emptyMessage } from "@/config/redux/reducer/authReducer";
import Dashboard from "../dashboard/page.js";


export default function LoginComponent(){

    const authState = useSelector((state) => state.auth)
    const router = useRouter();
    const dispatch = useDispatch();

    const [userLoginMethod , setUserLoginMethod]= useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [name, setName] = useState("")

    useEffect(() =>{
        if(authState.loggedIn){
            router.push("/dashboard")
        }
    },[ authState.loggedIn])

    useEffect(() =>{
       dispatch(emptyMessage())
    }, [userLoginMethod])

    const handleRegister =() =>{
        console.log("registering...");
        dispatch(registerUser({ username, password, email, name}))
    }

    const handleLogin = () =>{
        console.log("login...")
        dispatch(loginUser({email, password}))
    }

    return(
        <UserLayout>
            <div className = {Styles.container}>
                <div className = {Styles.cardContainer}>
                    <div className= {Styles.cardContainer__left}>
                        <p className = {Styles.cardleft__heading}>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
                        <p style={{color : authState.isError ? "red": "green"}}>{authState.message?.message}</p>

                        <div className = {Styles.inputContainers}>
                            {userLoginMethod ? (
                                // ✅ Sign In form
                                <>
                                    <input 
                                        onChange={(e)=> setEmail(e.target.value)} 
                                        className={Styles.inputField} 
                                        type="text" 
                                        placeholder="Email" 
                                    />
                                    <input 
                                        onChange={(e)=> setPassword(e.target.value)} 
                                        className={Styles.inputField} 
                                        type="password" 
                                        placeholder="Password" 
                                    />
                                </>
                            ) : (
                                // ✅ Sign Up form
                                <>
                                    <div className= {Styles.inputRow}>
                                        <input 
                                            onChange={(e) => setUserName(e.target.value)} 
                                            className={Styles.inputField} 
                                            type="text" 
                                            placeholder="Username"
                                        />
                                        <input 
                                            onChange={(e)=> setName(e.target.value)} 
                                            className={Styles.inputField} 
                                            type="text" 
                                            placeholder="Name"
                                        />
                                    </div>
                                    <input 
                                        onChange={(e)=> setEmail(e.target.value)} 
                                        className={Styles.inputField} 
                                        type="text" 
                                        placeholder="Email" 
                                    />
                                    <input 
                                        onChange={(e)=> setPassword(e.target.value)} 
                                        className={Styles.inputField} 
                                        type="password" 
                                        placeholder="Password" 
                                    />
                                </>
                            )}
                            <div
                                onClick={() =>{
                                    if(userLoginMethod){
                                        handleLogin();
                                    } else {
                                        handleRegister();
                                    }
                                }}
                                className= {Styles.buttonWithOutline}
                            >
                                <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
                            </div>
                        </div>
                    </div>

                    <div className = {Styles.cardContainer__right}>
                        <div>
                            {userLoginMethod ? <p>Don't Have an Account?</p>: <p>Already have an Account?</p>}  
                            <div 
                                onClick ={() =>{
                                    setUserLoginMethod(!userLoginMethod)
                                }} 
                                style={{color: "black"}} 
                                className={Styles.buttonWithOutline}
                            >
                                <p>{userLoginMethod ? "Sign Up" : "Sign In"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}
