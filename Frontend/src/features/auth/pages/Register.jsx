import React, { useState } from "react";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Nav from "../../shared/components/Nav";

const Register = () => {
  const { handleRegister, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  if (loading) {
    return (
      <main>
        <h1>Loading.....</h1>
      </main>
    );
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }

    const user = await handleRegister(username, email, password);

    if (!user) {
      alert("Registration Failed. Please try again.");
      return;
    }

    navigate("/setup-profile");
  }

  return (
    <main>
      <Nav />
      <section className="form-header">
        <h2>Create an Account</h2>
        <p>Join us to get started</p>
      </section>

      <section className="form-container">
        <h1>Register</h1>
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
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            placeholder="Enter your Email"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <button>Register</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="toggleAuthForm" to="/login">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
