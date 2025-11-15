import { useState } from 'react';
import './Header.css'
import logo from "../assets/logo.png"

export default function Header(){
    const [menuOpen, setMenuOpen] = useState(false);
    function toggleMenu(){
        setMenuOpen(!menuOpen);
    }
    return(
        <header className="header">
            <div className="logo">
                <img src= {logo} alt="kid-guard-logo"/>
                <h1>Kid Guard</h1>
            </div>
            <div className="hamburger" onClick={toggleMenu}> ☰  </div>
            <nav className={menuOpen ? "nav active" : "nav"}>
                <ul>
                    <li><a href="">Featers</a></li>
                    <li><a href="">How It Works</a></li>
                    <li><a href="">Testimonials</a></li>
                    <li><a href="">Pricing</a></li>
                </ul>
                <div class="header-right">
                    <button className="login">Login</button>
                    <button className="sign-up">Sign Up</button>
                </div>
            </nav>
            
        </header>
    );
}

