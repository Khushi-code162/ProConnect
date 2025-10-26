'use client';
import UserLayout from "../Layout/UserLayout/UserLayout"
import { useRouter } from 'next/navigation';
import React , { useEffect, useState }  from 'react'
import { useSelector } from 'react-redux'
import Styles from './login.module.css';


export default function LoginComponent(){


    const authState = useSelector((state) => state.auth)

    const router = useRouter();

    const [userLoginMethod , setUserLoginMethod]= useState(false);

    useEffect(() =>{
        if(authState.loggedIn){
            router.push("/dashboard")
        }
    })
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

                        <div className= {Styles.buttonWithOutline}>
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