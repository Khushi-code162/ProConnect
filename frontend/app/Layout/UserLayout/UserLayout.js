'use client';
import NavbarComponent from "../../Components/Navbar/page.js";
import React from "react";

function UserLayout( {children} ) {
    return(
        <>
        <div>
            <NavbarComponent />
            {children}
        </div>
        </>
    )
}

export default UserLayout;