'use client';
import UserLayout from "../Layout/UserLayout/UserLayout"
import { useRouter } from 'next/navigation';
import React , { useEffect, useState }  from 'react'
import { useSelector , useDispatch } from 'react-redux'
import Styles from './login.module.css';
import { registerUser } from "@/config/redux/action/authAction";



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


    const handleRegister =() =>{
        console.log("registering...");
        dispatch(registerUser({ username, password, email, name}))
    }
    return(
        <UserLayout>
            <div className = {Styles.container}>
            <div className = {Styles.cardContainer}>
                <div className= {Styles.cardContainer__left}>
                    <p className = {Styles.cardleft__heading}>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
                    <p style={{color : authState.isError ? "red": "green"}}>{authState.message?.message}</p>

                    <div className = {Styles.inputContainers}>
                        <div className= {Styles.inputRow}>
                            <input onChange= {(e) => setUserName(e.target.value)} className={Styles.inputField} type="text" placeholder="username"/>
                            <input onChange = {(e)=> setName(e.target.value)} className={Styles.inputField} type="text" placeholder="Name"/>

                        </div>
                        <input onChange = {(e)=> setEmail(e.target.value)} className={Styles.inputField} type="text" placeholder="Email" />
                        <input onChange = {(e)=> setPassword(e.target.value)} className={Styles.inputField} type="text" placeholder="Password" />

                        <div
                        onClick={() =>{
                            if(userLoginMethod){

                            } else {
                                handleRegister();
                            }
                        }}
                        className= {Styles.buttonWithOutline}>
                            <p> {userLoginMethod ? "Sign In" : "Sign Up"}</p>
                        </div>
                    </div>

                </div>
                <div className = {Styles.cardContainer__right}>

                </div>
            </div>
            </div>



        </UserLayout>
    )
}