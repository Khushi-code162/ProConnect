import React from 'react';
import styles from "./Dashboard.module.css";

const DashboardLayout = ({children}) => {
  return (
    <div>
        <div className="container">
      <div className={styles.homeContainer}>
        <div className="homeContainer__leftBar"></div>

      </div>

    <div className = "homeContainer__feedContainer">
        {children}
        </div>      

    </div>
    <div className='homeContainer__extraContainer'></div>
    </div>
  )
}

export default DashboardLayout