import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { useEffect, useRef } from "react";
import { logout } from "../../firebase";

const Navbar = () => {
  const navRef = useRef(); /* useRef() is a hook that lets you:
Reference a DOM element directly (like document.querySelector() in vanilla JS).
Or store mutable values that persist across renders without causing re-renders.
*/
  {
    /*It adds a scroll event listener to the browser window.
That listener checks how far the user has scrolled.
If the user scrolls more than 80 pixels, it adds a CSS class (nav_black) to the nav bar (probably to change its appearance).
If the user scrolls back up, it removes the class*/
  }
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });
  }, []);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="Search Icon" className="icons" />
        <p>Children</p>
        <img src={bell_icon} alt="bell Icon" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile Icon" className="profile" />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <p onClick={() => logout()}>Sign out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
