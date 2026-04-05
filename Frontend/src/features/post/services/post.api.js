import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/posts",
    withCredentials: true
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export async function getFeed(page = 1, limit = 5) {
    try {
        const res = await api.get(`/feed?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        throw error.res?.data?.message || "Error fetching feed";
    }
}

export const likePost = (postId) => {
    return api.post(`/like/${postId}`);
};

export const unlikePost = (postId) => {
    return api.post(`/unlike/${postId}`);
};

