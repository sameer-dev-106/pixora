import { useCallback, useContext } from "react";
import { getFeed, likePost, unlikePost, createPost } from "../services/post.api.js";
import PostContext from "../Post.context.jsx";


export const usePost = () => {

    const context = useContext(PostContext)

    const { loading, setLoading, post, feed, setFeed, error, setError, setPage, setTotalPages } = context

    const handleGetFeed = useCallback(async (newPage = 1) => {
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
    }, [setLoading, setFeed, setPage, setTotalPages, setError])

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

    const handleCreatePost = async ({imageFile, caption}) => {
        setLoading(true);
        try {
            const data = await createPost({imageFile, caption}) 
            if (data?.post) {
                setFeed([data.post, ...feed]);
                return data.post
            }
            throw new Error("Post Creating failed");
        } catch (error) {
            const message =
                typeof error === "string"
                    ? error
                    : error?.response?.status?.message
                ;

            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return { handleGetFeed, handleLike, handleCreatePost, loading, feed, post, error };

}



