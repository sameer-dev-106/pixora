import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/auth/pages/Home";
import GetMe from "./features/auth/pages/GetMe";
import SetupProfile from "./features/auth/pages/SetupProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);
