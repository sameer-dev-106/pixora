import React from "react";
import "../style/loading.scss";

const LoadingPage = () => {
  return (
    <main className="loading-page">
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    </main>
  );
};

export default LoadingPage;
