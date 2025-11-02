'use client';
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";

export default function NavbarComponent() {

    const router = useRouter();

    const authState = useSelector((state) => state.auth)
    return (
        <div className={styles.container}>
            <nav className= {styles.navBar}>
            <h2  style ={{cursor: "pointer"}} onClick ={() => {
                router.push("/")
            }}>Pro Connect</h2> 
            <div style={{display: "flex", gap:"1.2rem"}}>
                <p>Hey, {authState.user?.userId?.name}</p>
                <p style={{fontweight: "bold" , cursor: "pointer" }}>Profile</p>
            </div>

            <div className={styles.navBaroptionContainer}>
                {!authState.profileFetched && 
                <div onClick={() =>{
                    router.push("/login")
                }} className={styles.buttonJoin}>
                    <p>Be a part</p>
                </div>
            }
            </div>

            </nav>
        </div>
    
    );
}