import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import "./styles/main.scss";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { PostContextProvider } from "./features/post/Post.context.jsx";

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
