import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Swal from "sweetalert2";
import "./Signup.css"

const nameRegex = /^[a-zA-Z\s]{3,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function Signup() {
  useEffect(() => {
    document.body.classList.add("login-and-sign-body");

    return () => {
      document.body.classList.remove("login-and-sign-body");
    };
  }, []);

  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = [];

    if (!nameRegex.test(fullName)) {
      errors.push("Full name must be at least 3 letters");
    }

    if (!emailRegex.test(email)) {
      errors.push("Please enter a valid email address");
    }

    if (!passwordRegex.test(password)) {
      errors.push(
        "Password must be at least 8 characters, include one capital letter and one number"
      );
    }

    if (password !== confirmPass) {
      errors.push("Password and confirm password do not match");
    }

    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Please fix the following errors and try again",
        html: `<ul style="text-align:left;">
          ${errors.map(error => `<li>${error}</li>`).join("")}
        </ul>`,
      });
      return;
    }
    
    Swal.fire({
      icon: "success",
      title: "Registration completed successfully",
    });
  };


  return (
    <div className="sign-page">
      <div className="sign-card">
        <h2>Create Kid Guard Account</h2>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
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

          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Sign Up
          </button>
        </form>

        <div className="divider">or</div>

        <div className="social-login">
          <button className="google"> <FcGoogle size={20}/>Continue with Google</button>
          <button className="apple"><FaApple size={20}/>Continue with Apple</button>
        </div>

        <p className="login-text">
          Already have an account? {" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}