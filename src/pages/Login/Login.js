import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import "./Login.css"

export default function Login() {
  useEffect(() => {
    document.body.classList.add("login-and-sign-body");

    return () => {
      document.body.classList.remove("login-and-sign-body");
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login to Kid Guard</h2>

        <form onSubmit={handleSubmit}>
          <label>Email or Username</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <a href="#" className="forgot">Forgot Password?</a>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="divider">or</div>

        <div className="social-login">
          <button className="google"> <FcGoogle size={20}/>Continue with Google</button>
          <button className="apple"><FaApple size={20}/>Continue with Apple</button>
        </div>

        <p className="signup-text">
          Don't have an account? {" "}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}






