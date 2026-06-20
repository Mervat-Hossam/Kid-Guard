import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/logo.png";

export default function Header({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  const handleSectionClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/?section=" + id);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };


  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="kid-guard-logo" />
        <h1>Kid Guard</h1>
      </div>

      <div className="hamburger" onClick={toggleMenu}>☰</div>
      
      <nav className={menuOpen ? "nav active" : "nav"}>
         <ul>
           <li>
             <a href="#features" onClick={(e) => handleSectionClick(e, "features")}>
               Features
             </a>
           </li>
           <li>
             <a href="#works" onClick={(e) => handleSectionClick(e, "works")}>
               How It Works
             </a>
           </li>
           <li>
             <a
               href="#testimonials" onClick={(e) => handleSectionClick(e, "testimonials")}
             >
               Testimonials
             </a>
           </li>
           <li>
             <a href="#pricing" onClick={(e) => handleSectionClick(e, "pricing")}>
               Pricing
             </a>
           </li>
         </ul>

        <div className="header-right">
          {isDashboard || user ? (
            <span className="user-name">Hello, {user?.name || "Mai"}</span>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="login">Login</button>
              </Link>

              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <button className="sign-up">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
