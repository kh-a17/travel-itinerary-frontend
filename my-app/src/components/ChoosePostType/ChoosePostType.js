import React from 'react';
import './ChoosePostType.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'; // Adjust path if needed

const ChoosePostType = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar /> {/* Navbar added */}
      <div className="home-background">
        {/* Optional background video if you want */}
        {/* <video autoPlay muted loop playsInline className="bg-video">
          <source src={travelVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}

        <div className="home-container">
          <h1 className="home-title">Choose how you want to share your trip!</h1>

          <div className="card-grid">
            <div className="card viewer-card">
              <h2> Speak </h2>
              <button
                className="home-button"
                onClick={() => navigate('/speech-to-text')}
              >
                Speak out your Experience
              </button>
            </div>

            <div className="card post-card">
              <h2>Fill out a Form</h2>
              <button
                className="home-button"
                onClick={() => navigate('/post-filters')}
              >
                Post Your Experience
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoosePostType;
