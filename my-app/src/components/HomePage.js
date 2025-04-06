import React from 'react';
import './HomePage.css';
import travelVideo from '../assets/Bg2.mp4';
import { useNavigate } from 'react-router-dom'; // import

const HomePage = () => {
  const navigate = useNavigate(); // 

  return (
    <div className="home-background">
      <video autoPlay muted loop playsInline className="bg-video">
        <source src={travelVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="home-container">
        <h1 className="home-title">Welcome to Timeless Moments!</h1>
        <p className="home-subtitle">Choose your path below and start your travel journey</p>

        <div className="card-grid">
          <div className="card viewer-card">
            <h2>🔭 Viewer</h2>
            <p>Looking for inspiration? Search for a city or activity and explore real itineraries shared by fellow travelers!</p>
            <button
              className="home-button"
              onClick={() => navigate('/search')} // navigate to search
            >
              Explore Itineraries
            </button>
          </div>

          <div className="card post-card">
            <h2>📝 Post</h2>
            <p>Had an amazing trip? Share your story, highlights, and tips — and help fellow explorers plan their perfect journey!</p>
            <button className="home-button"
                          onClick={() => navigate('/post-type')} // navigate to search
                        >
              
              Post Your Experience</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
