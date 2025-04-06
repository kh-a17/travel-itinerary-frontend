import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaUserCircle } from 'react-icons/fa'; // ✅ Import icon
import Navbar from './Navbar';

const OwnItinerary = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div>Hello</div>
        </>
    );
};

export default OwnItinerary;
