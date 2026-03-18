import React, { useState } from "react";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { handleLogin, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  if (loading) {
    return (
      <main>
        <h1>Loading......</h1>
      </main>
    );
  }

  async function submitHandler(e) {
    e.preventDefault();

    await handleLogin(username, password);

    navigate("/");

  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={(e) => submitHandler(e)}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter your Username"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <button>Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="toggleAuthForm" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
