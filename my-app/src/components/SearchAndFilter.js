import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

function SearchAndFilter() {
  const navigate = useNavigate();

  const [city_name, setCityName] = useState('');
  const [age, setAge] = useState('');
  const [group, setGroup] = useState('');
  const [season, setSeason] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = async () => {
    if (!city_name.trim()) {
      alert('Please enter a city name');
      return;
    }

    const query = {
      city_name,
      ...(age && { age }),
      ...(group && { group }),
      ...(season && { season }),
      ...(budget && { budget }),
    };

    try {
      const response = await axios.get('http://localhost:5000/api/posts/get-post-info', {
        params: query,
      });
      navigate('/view-post', { state: { results: response.data, filters: query } });
    } catch (err) {
      console.error('❌ Failed to fetch itineraries:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="search-and-filter-container">
        <h1 className="title">Timeless Moment Awaits</h1>
        <p className="subtitle">
          Plan Smarter, travel farther – explore real itineraries from real travelers.
        </p>

        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            value={city_name}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city name or an activity you want to do"
          />
        </div>

        <div className="filters">
          <label>
            Age:
            <select value={age} onChange={(e) => setAge(e.target.value)}>
              <option value="">Select</option>
              <option value="20-30">20-30</option>
              <option value="30-40">30-40</option>
              <option value="40-50">40-50</option>
              <option value="50-60">50-60</option>
            </select>
          </label>

          <label>
            Group:
            <select value={group} onChange={(e) => setGroup(e.target.value)}>
              <option value="">Select</option>
              <option value="Solo">Solo</option>
              <option value="Family">Family</option>
              <option value="Work">Work</option>
            </select>
          </label>

          <label>
            Season:
            <select value={season} onChange={(e) => setSeason(e.target.value)}>
              <option value="">Select</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
            </select>
          </label>

          <label>
            Budget:
            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="">Select</option>
              <option value="500-1000">500-1000</option>
              <option value="1000-2000">1000-2000</option>
              <option value="2000-3000">2000-3000</option>
              <option value="3000-4000">3000-4000</option>
              <option value="4000-5000">4000-5000</option>
              <option value="5000-6000">5000-6000</option>
            </select>
          </label>
        </div>

        <div className="button-wrapper">
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchAndFilter;
