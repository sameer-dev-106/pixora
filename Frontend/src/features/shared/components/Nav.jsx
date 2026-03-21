import React from "react";
import "../style/nav.scss";
import { BellDot, User } from "lucide-react";
import { useNavigate } from "react-router";

const Nav = () => {

    const navigate = useNavigate();

  return (
    <header className="feed-header">
      <div className="nav-btn">
        <User onClick={() => {
            navigate("/get-me")
        }} />

      </div>
      <nav className="feed-nav">
        <h1>Pixora</h1>
      </nav>
      <button className="nav-btn">
        <BellDot />
      </button>
    </header>
  );
};

export default Nav;
