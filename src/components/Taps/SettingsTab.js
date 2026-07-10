import { useState } from "react";

import Swal from "sweetalert2";

import {
  updateUser,
  deleteAccount,
} from "../../Services/userService";

import { logout }
from "../../Services/authService";

import "./SettingsTab.css";

export default function SettingsTab({
  user,
}) {

  // USER INFO
  const [name, setName] =
    useState(user?.name || "");

  const [email, setEmail] =
    useState(user?.email || "");

  // const [photoUrl,
  //   setPhotoUrl] =
  //   useState(user?.photoUrl || "");
  const [photo, setPhoto] =
  useState(null);

const [preview, setPreview] =
  useState(user?.photoUrl || "");

  // PASSWORD
  const [currentPassword,
    setCurrentPassword] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const handleImageChange =
  (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setPhoto(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  // UPDATE PROFILE
  const handleUpdateProfile =
    async () => {

      try {

        await updateUser(
          name,
          photo
          // photoUrl
        );

        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text:
            "Your information updated successfully",
        });

      } catch (err) {

        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: err.message,
        });
      }
    };

  // CHANGE PASSWORD
  const handlePasswordChange =
    async () => {

      if (
        newPassword !==
        confirmPassword
      ) {

        Swal.fire({
          icon: "error",
          title: "Passwords do not match",
        });

        return;
      }

      Swal.fire({
        icon: "success",
        title: "Password Updated",
      });
    };

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

  localStorage.clear(); 

  window.location.replace("/Kid-Guard/login"); 
};

  // DELETE ACCOUNT
  const handleDeleteAccount =
    async () => {

      const result =
        await Swal.fire({
          title:
            "Delete Account?",

          text:
            "This action cannot be undone",

          icon: "warning",

          showCancelButton: true,

          confirmButtonColor:
            "#d33",

          confirmButtonText:
            "Delete",
        });

      if (!result.isConfirmed)
        return;

      try {

        await deleteAccount();

        localStorage.removeItem(
          "token"
        );

        Swal.fire({
          icon: "success",
          title:
            "Account Deleted",
        }).then(() => {

          window.location.href =
            "/register";
        });

      } catch (err) {

        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message,
        });
      }
    };

  return (

    <div className="settings-page">

      <h1>
        Settings
      </h1>

      {/* PROFILE */}

      <div className="settings-card">

        <h2>
          Account Information
        </h2>

        <input
          type="text"
          placeholder="Name"

          value={name}

          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

        <input
          type="email"
          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <div className="profile-image">
          <img
            src={
              preview ||
              "https://via.placeholder.com/120"
            }

            alt="Profile"
          />

          <input
            type="file"
            accept="image/*"

            onChange={
              handleImageChange
            }
          />
        </div>

        <button
          onClick={
            handleUpdateProfile
          }
        >
          Save Changes
        </button>

      </div>

      {/* PASSWORD */}

      <div className="settings-card">

        <h2>
          Change Password
        </h2>

        <input
          type="password"
          placeholder="Current Password"

          value={currentPassword}

          onChange={(e) =>
            setCurrentPassword(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="New Password"

          value={newPassword}

          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"

          value={confirmPassword}

          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={
            handlePasswordChange
          }
        >
          Update Password
        </button>

      </div>

      

      {/* LOGOUT */}

      <div className="settings-card">

        <button
          className="logout-btn"

          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* DELETE */}

      <div className="settings-card danger">

        <button
          className="delete-btn"

          onClick={
            handleDeleteAccount
          }
        >
          Delete Account
        </button>

      </div>

    </div>
  );
}