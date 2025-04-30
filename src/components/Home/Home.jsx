import React from "react";
import "./Home.css"; // Custom CSS for Home

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Catering App</h1>
      <p className="home-description">
        Discover and order delicious catering from local providers, or promote
        your own catering business.
      </p>
      {/* You can add more content here, like featured products or calls to action */}
    </div>
  );
}

export default Home;
