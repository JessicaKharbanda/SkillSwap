import React from "react"
import { useNavigate } from "react-router-dom";
import './navigation.css';

function NavigationBar(){
    const navigate = useNavigate();
    return(
    <header className="header">
    <a href="#home" className="logo" onClick={() => navigate("/")}>SkillSwap</a>
   
    <ul className="menu">
      <li><a href="#aboutus">About Us</a></li>
      <li><a href="#services">Services</a></li>
      <li onClick={() => navigate("/signup")}><a href="#signup">Sign Up</a></li>
      <li onClick={() => navigate("/login")}><a href="#login">Log In</a></li>
      <li onClick={() => navigate("/matching")}><a href="#matching">Match</a></li>
    </ul>
  </header>
    )
}

export default NavigationBar;