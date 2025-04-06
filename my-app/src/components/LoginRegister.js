import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import './AuthForm.css';
import BgVideo from '../assets/Bg2.mp4'; // Make sure the path and file name match

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setAlertMessage('');
    setIsLogin(!isLogin);
  };

  const handleAuth = async (formData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/${isLogin ? 'login' : 'signup'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage(data.message);
        setAlertType('success');
        if (isLogin) {
          setTimeout(() => {
            navigate('/home');
          }, 1000);
        }
      } else {
        setAlertMessage(data.message);
        setAlertType('error');
      }
    } catch (err) {
      setAlertMessage('Something went wrong. Please try again.');
      setAlertType('error');
    }
  };

  return (
    <div className="video-background-wrapper">
      {/* Background Video */}
      <video autoPlay muted loop playsInline preload="auto" className="bg-video">
        <source src={BgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Foreground Plane Animation and Form */}
      <div className="plane-overlay">✈</div>

      <div className="auth-container">
        {alertMessage && (
          <div className={`alert-message ${alertType}`}>
            {alertMessage}
          </div>
        )}
        <AuthForm type={isLogin ? 'login' : 'signup'} onSubmit={handleAuth} />
        <p onClick={toggleForm} className="toggle-link">
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;