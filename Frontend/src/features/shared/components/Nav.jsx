import React from "react";
import "../style/nav.scss";
import { useNavigate } from "react-router";

const Nav = () => {

    const navigate = useNavigate();

  return (
    <header className="feed-header">
      <nav className="feed-nav">
        <h1
          onClick={() => {
            navigate("/");
          }}
        >
          Pixora
        </h1>
      </nav>
    </header>
  );
};

export default Nav;
