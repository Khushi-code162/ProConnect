'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();
  return(

    <>
      <div className={styles.container}>
        
        <div className = "mainContainer">

        <div className = "mainContainer__left">
          <p> Connect with Friends without Exaggeration</p>

          <p> A True social media platform, with stories no blufs!</p>


          <div onClick = {() =>{
             router.push("/login") 
          }} className = "buttonJoin">
            <p>Join Now</p>

          </div>

        </div>

        <div className ="mainContainer__right">
          <img src ="/images/Connection.jpg" alt= "connection" />


        </div>
        </div>
      </div>
    </>
  )
}
