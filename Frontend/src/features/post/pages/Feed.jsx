import React, { useEffect } from "react";
import "../styles/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import LoadingPage from "../../shared/components/LoadingPage";

const Feed = () => {
  const { feed, handleGetFeed, loading, page, totalPages } = usePost();

  useEffect(() => {
    handleGetFeed(1);
  }, [handleGetFeed]);

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
  }, [handleGetFeed, page, totalPages, loading]);

  return (
    <section className="feed-page">
      <div className="feed">
        <div className="posts">
          {feed?.map((post, idx) => {
            return <Post key={idx} user={post.user} post={post} />;
          })}
          {loading && <LoadingPage />}
        </div>
      </div>
    </section>
  );
};

export default Feed;
