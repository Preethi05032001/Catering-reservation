import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import "./Profile.css"; // Custom CSS for Profile

function Profile() {
  const { user } = useAuth();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      <div className="profile-details">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        {/* Add more profile details here if your user object has them */}
        {/* For example: */}
        {/* <p><strong>Email:</strong> {user.email}</p> */}
        {/* <p><strong>Address:</strong> {user.address}</p> */}
      </div>
      {/* Add options to edit profile if needed */}
      {/* <button className="edit-profile-button">Edit Profile</button> */}
    </div>
  );
}

export default Profile;
