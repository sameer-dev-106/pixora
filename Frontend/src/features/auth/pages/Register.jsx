import React from "react";
import "../styles/form.scss";
import { Link } from "react-router";

const Register = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <input
            type="text"
            name="username"
            placeholder="Enter your Username"
          />
          <input type="email" name="email" placeholder="Enter your Email" />
          <input
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
      </div>
    </main>
  );
};

export default Register;
