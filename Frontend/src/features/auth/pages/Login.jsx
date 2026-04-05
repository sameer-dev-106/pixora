import React, { useState } from "react";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Nav from "../../shared/components/Nav";

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

    if (!username || !password) {
      alert("All fields are required");
      return;
    }

    const user = await handleLogin(username, password);

    if(!user) {
      alert("Login Failed. Please check your credentials and try again.");
      return;
    }

    if (!user.bio) {
      navigate("/setup-profile");
    } else {
      navigate("/");
    }

  }

  return (
    <main>
      <Nav />
      <section className="form-header">
        <h2>Welcome Back!</h2>
        <p>Login to your account to continue</p>
      </section>
      <section className="form-container">
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
      </section>
    </main>
  );
};

export default Login;
