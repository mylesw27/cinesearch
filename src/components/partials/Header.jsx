import React from "react";
import Navbar from "../Navbar";
import logo from "../assets/Logo.png";

export default function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Logo" />
      <Navbar />
    </div>
  );
}
