'use client';
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./Navbar.module.css";

export default function NavbarComponent() {

    const router = useRouter();
    return (
        <div className={styles.container}>
            <nav className= {styles.navBar}>
            <h2  style ={{cursor: "pointer"}} onClick ={() => {
                router.push("/")
            }}>Pro Connect</h2>
            <div className={styles.navBaroptionContainer}>
                <div onClick={() =>{
                    router.push("/login")
                }} className={styles.buttonJoin}>
                    <p>Be a part</p>
                </div>
            </div>
            </nav>
        </div>
    
    );
}