import { createContext, useState } from "react";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [feed, setFeed] = useState(null);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <PostContext.Provider
      value={{
        loading,
        setLoading,
        post,
        setPost,
        feed,
        setFeed,
        page,
        setPage,
        totalPages,
        setTotalPages,
        error,
        setError,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
