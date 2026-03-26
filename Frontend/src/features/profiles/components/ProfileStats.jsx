import React from "react";
import "./styles/profileStats.scss";

const ProfileStats = ({ postCount, followerCount, followingCount }) => {
  return (
    <section className="profile-stats">
      <div className="stat">
        <h3 className="number">{postCount || 0}</h3>
        <p className="label">Posts</p>
      </div>

      <div className="stat">
        <h3 className="number">{followerCount || 0}</h3>
        <p className="label">Followers</p>
      </div>

      <div className="stat">
        <h3 className="number">{followingCount || 0}</h3>
        <p className="label">Following</p>

      </div>
    </section>
  );
};

export default ProfileStats;
