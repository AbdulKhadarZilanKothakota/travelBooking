import { NavLink } from "react-router-dom";
import { Compass, UserRound } from "lucide-react";

export default function Navbar() {
  const isLoggedIn = Boolean(
    sessionStorage.getItem("exploreIndiaUser")
  );

  return (
    <header className="navbar">
      <NavLink to="/" className="brand">
        <span className="brand-icon">
          <Compass size={24} />
        </span>
        <span>
          Explore<span className="brand-highlight">India</span>
        </span>
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        {!isLoggedIn ? (
          <NavLink to="/login" className="login-link">
            Login / Sign Up
          </NavLink>
        ) : (
          <NavLink to="/profile" className="profile-link">
            <UserRound size={17} /> Profile
          </NavLink>
        )}
      </nav>
    </header>
  );
}