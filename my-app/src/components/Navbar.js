import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaUserCircle } from 'react-icons/fa'; // Import icon

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button onClick={() => navigate('/home')} className="nav-button">Home</button>
      </div>

      <div className="navbar-right">
        <button className="nav-button" onClick={() => navigate('/own-itinerary')}>
          Make Your Own Itinerary
        </button>
        <button className="nav-button" onClick={() => navigate('/match-solo')}>
          Match Solo Travellers
        </button>
        
        {/* User Icon */}
        <FaUserCircle className="profile-icon" onClick={() => navigate('/my-posts')} />
      </div>
    </nav>
  );
};

export default Navbar;
