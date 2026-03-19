import React from "react";
import "./styles/profilePosts.scss";

const ProfilePosts = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p>No posts yet</p>;
  }

  return (
    <section className="profile-posts">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <img src={post.imgUrl} alt="post" />
        </div>
      ))}
    </section>
  );
};

export default ProfilePosts;
