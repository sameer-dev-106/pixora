import React, { useEffect } from "react";
import "../styles/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import Nav from "../../shared/components/Nav";
import BottomNav from "../../shared/components/BottomNav";

const Feed = () => {
  const { feed, handleGetFeed, loading, page, totalPages } = usePost();

  useEffect(() => {
    handleGetFeed(1);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (bottom && page < totalPages && !loading) {
        handleGetFeed(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="feed-page">
      {/* <Nav /> */}
      <div className="feed">
        <div className="posts">
          {feed?.map((post, idx) => {
            return <Post key={idx} user={post.user} post={post} />;
          })}
          {loading && <p align="center">Loading more...</p>}
        </div>
      </div>
      {/* <BottomNav /> */}
    </main>
  );
};

export default Feed;
