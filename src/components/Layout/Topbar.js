import Swal from "sweetalert2";
import { logout } from "../../Services/authService";
import "./Topbar.css";
import logo from "../../assets/logo.png"

export default function Topbar({ user, setSidebarOpen }) {

  const name = user?.name || "User";
  const initial = name.charAt(0).toUpperCase();

  const handleLogout = async () => {

    const result = await Swal.fire({
      title: "Logout?",
      text: "You will need to login again",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
    });

    if (!result.isConfirmed) return;

    await logout();

    window.location.href = "/Kid-Guard/login";
  };

  return (
    <div className="topbar">

      <button
        className="menu-btn"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      <div className="logo">
        <img src={logo} alt="kid-guard-logo" />
        <h1>Kid Guard</h1>
      </div>

      <div className="user-section">

        <span>Welcome, {name}</span>

        {user?.photoUrl ? (
          <img src={user.photoUrl} alt="user" />
        ) : (
          <div className="avatar-fallback">
            {initial}
          </div>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>

    </div>
  );
}