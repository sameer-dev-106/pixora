import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import GetMe from "./features/auth/pages/GetMe";
import SetupProfile from "./features/auth/pages/SetupProfile";
import Feed from "./features/post/pages/Feed";
import CreatePost from "./features/post/pages/CreatePost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/setup-profile",
    element: <SetupProfile />,
  },
  {
    path: "/get-me",
    element: <GetMe />,
  },
  {
    path: "/create-post",
    element: <CreatePost />
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);
