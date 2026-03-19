import { useContext } from "react";
import AuthContext from "../auth.context.jsx";
import { register, updateProfile, login, getMe } from "../services/auth.api.js";


export function useAuth() {

    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading, error, setError } = context;

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        try {
            const response = await register(username, email, password);
            if (response?.user) {
                setUser(response.user);
            }
            return response.user;
        } catch (error) {
            console.log(error);
            const message =
                typeof error === "string"
                    ? error
                    : error?.response?.data?.message || "Something went wrong"
                ;

            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async ({ bio, profileImage }) => {
        setLoading(true);
        try {
            const response = await updateProfile({ bio, profileImage });
            if (response?.user) {
                setUser(response.user);
                return response.user;
            }
            throw new Error("Profile update failed");

        } catch (error) {
            console.log(error);
            const message =
                typeof error === "string"
                    ? error
                    : error?.response?.data?.message || "Something went wrong"
                ;

            setError(message);
            return null;

        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (username, password) => {
        setLoading(true);
        try {
            const response = await login(username, password);
            if (response?.user) {
                setUser(response.user);
            }
            return response.user;
        } catch (error) {
            console.log(error);
            const message =
                typeof error === "string"
                    ? error
                    : error?.response?.data?.message || "Something went wrong"
                ;

            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleGetMe = async () => {
        setLoading(true);
        try {
            const response = await getMe();
            setUser(response);
            return response;

        } catch (error) {
            console.log(error);
            const message =
                typeof error === "string"
                    ? error
                    : error?.response?.data?.message || "Something went wrong"
                ;

            setError(message);
            return null;

        } finally {
            setLoading(false);
        }
    };

    return {
        user, loading, error, setError, handleRegister, handleUpdateProfile, handleLogin, handleGetMe
    }

}

