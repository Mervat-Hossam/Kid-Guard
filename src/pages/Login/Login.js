import Swal from "sweetalert2";
import { Link, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  useEffect(() => {
    document.body.classList.add("login-and-sign-body");

    return () => {
      document.body.classList.remove("login-and-sign-body");
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid email",
        text: "Please enter a valid email address",
      });
      return;
    }

    // if (password.length < 8) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Invalid password",
    //     text: "Password must be at least 8 characters",
    //   });
    //   return;
    // }

    try {
      const response = await fetch(
        "https://kidsguard-production.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          // credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      // const data = await response.json();

      // if (!response.ok) {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Login failed",
      //     text: data.message || "Invalid email or password",
      //   });
      //   return;
      // }

      // localStorage.setItem("token", data.token);

      // Swal.fire({
      //   icon: "success",
      //   title: "Login successful",
      // }).then(() => {
      //   navigate("/dashboard");
      // });

      const data = await response.json();

console.log("LOGIN RESPONSE:", data); // 👈 مهم

if (!response.ok) {
  Swal.fire({
    icon: "error",
    title: "Login failed",
    text: data.message || "Invalid email or password",
  });
  return;
}

// 🔥 هنا الحل
const token = data.token || data.accessToken || data.jwt;

if (!token) {
  Swal.fire({
    icon: "error",
    title: "Login error",
    text: "No token received from server",
  });
  return;
}

// 🔥 خزني التوكن
localStorage.setItem("token", token);

// 🔥 خزني بيانات اليوزر كمان
localStorage.setItem("user", JSON.stringify(data.user));

// 🔥 اعملي success + navigation
Swal.fire({
  icon: "success",
  title: "Login successful 🎉",
}).then(() => {
  navigate("/dashboard");
});


    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server error",
        text: "Please try again later",
      });
    }
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
          {/* <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

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






