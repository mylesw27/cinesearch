import React from "react"
import Navbar from "../components/Navbar"
import logo from "../components/assets/Logo.png"

export default function Header () {
    return(
        <div className= "header">
            <img src={logo} alt="Logo" />
            <p><Navbar /></p>
        </div>
    )
  
}