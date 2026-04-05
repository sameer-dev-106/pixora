import React from "react";
import "./styles/profileHeader.scss";

const ProfileHeader = ({ user }) => {
  return (
    <>
      <section className="profile-header">
        <div className="profile">
          <div className="profile-image">
            <img src={user?.profileImage} width={"100px"} alt="Profile" />
          </div>
          <div className="profile-info">
            <h2 className="fullname">{user?.fullname}</h2>
            <h3 className="username">{user?.username}</h3>
            <button>Edit Profile</button>
          </div>
        </div>
        <div className="user-bio">
          <p className="bio">{user?.bio}</p>
        </div>
      </section>
    </>
  );
};

export default ProfileHeader;
