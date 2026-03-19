import React from "react";
import "./styles/profileHeader.scss";

const ProfileHeader = ({ user }) => {

  return (
    <section className="profile-header">
      <div className="profile-image">
        <img src={user?.profileImage} width={"100px"} alt="Profile" />
      </div>
      <div className="profile-info">
        <h2 className="username">{user?.username}</h2>
        <p className="bio">{user?.bio}</p>
        <button>Edit Profile</button>
      </div>
    </section>
  );
};

export default ProfileHeader;
