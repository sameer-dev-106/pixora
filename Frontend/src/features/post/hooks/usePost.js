import { useContext } from "react";
import { getFeed, likePost, unlikePost } from "../services/post.api.js";
import PostContext from "../Post.context.jsx";


export const usePost = () => {

    const context = useContext(PostContext)

    const { loading, setLoading, post, setPost, feed, setFeed, error, setError, page, setPage, totalPages, setTotalPages } = context

    const handleGetFeed = async (newPage = 1) => {
        setLoading(true);
        try {
            const response = await getFeed(newPage);

            if (response?.posts) {
                setFeed(prev => [...(prev || []), ...response.posts]);
                setPage(response.currentPage);
                setTotalPages(response.totalPages);
            }

        } catch (error) {
            const message =
                typeof error === "string"
                    ? error
                    : error?.response?.status?.message 
                ;

            setError(message);
        } finally {
            setLoading(false)
        }
    }

    const handleLike = async (postId, isLiked) => {
        try {
            if (isLiked) {
                await unlikePost(postId);
            } else {
                await likePost(postId);
            }

            setFeed((prev) =>
                prev.map((post) =>
                    post._id === postId
                        ? {
                            ...post,
                            isLiked: !isLiked,
                            likesCount: isLiked
                                ? post.likesCount - 1
                                : post.likesCount + 1,
                        }
                        : post
                )
            );

        } catch (error) {
            console.log(error);
        }
    }

    return { handleGetFeed, handleLike, loading, feed, post, error };

}



