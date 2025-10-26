'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import UserLayout  from "./Layout/UserLayout/UserLayout.js";


export default function Home() {

  const router = useRouter();
  return(

    <UserLayout>
      <div className={styles.container}>
        
        <div className = {styles.mainContainer}>

        <div className = {styles.mainContainer__left}>
          <p> Connect with Friends without Exaggeration</p>

          <p> A True social media platform, with stories no blufs!</p>


          <div onClick = {() =>{
             router.push("/login") 
          }} className = {styles.buttonJoin}>
            <p>Join Now</p>

          </div>

        </div>

        <div className ={styles.mainContainer__right}>
          <img src ="/images/Connection.jpg" alt= "connection" />


        </div>
        </div>
      </div>
    </UserLayout>
  )
}
