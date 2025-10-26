'use client';
import UserLayout from "../Layout/UserLayout/UserLayout"
import { useRouter } from 'next/navigation';
import React , { useEffect, useState }  from 'react'
import { useSelector , useDispatch } from 'react-redux'
import Styles from './login.module.css';


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
    })


    const handleRegister =() =>{
        console.log("registering...");
    }
    return(
        <UserLayout>
            <div className = {Styles.container}>
            <div className = {Styles.cardContainer}>
                <div className= {Styles.cardContainer__left}>
                    <p className = {Styles.cardleft__heading}>{userLoginMethod ? "Sign In" : "Sign Up"}</p>

                    <div className = {Styles.inputContainers}>
                        <div className= {Styles.inputRow}>
                            <input className={Styles.inputField} type="text" placeholder="username"/>
                            <input className={Styles.inputField} type="text" placeholder="Name"/>

                        </div>
                        <input className={Styles.inputField} type="text" placeholder="Email" />
                        <input className={Styles.inputField} type="text" placeholder="Password" />

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