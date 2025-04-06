import React from 'react';
import './ViewPage.css';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';

const ViewPage = () => {
  const location = useLocation();
  const results = location.state?.results || [];
  const filters = location.state?.filters || {};

  return (
    <div className="view-page">
      <Navbar />
      <div className="filter-bar-horizontal">
        <span><strong>City:</strong> {filters.city_name}</span>
        {filters.age && <span><strong>Age:</strong> {filters.age}</span>}
        {filters.group && <span><strong>Group:</strong> {filters.group}</span>}
        {filters.season && <span><strong>Season:</strong> {filters.season}</span>}
        {filters.budget && <span><strong>Budget:</strong> {filters.budget}</span>}
      </div>

      <div className="user-cards">
        {results.length === 0 ? (
          <p>No matching itineraries found.</p>
        ) : (
          results.map((post, index) => (
            <div key={index} className="user-itinerary-card">
              <h2>Traveler {index + 1}'s Itinerary</h2>
              <p><strong>City:</strong> {post.city_name}</p>
              <span><strong>Accomodation:</strong> {post.accomodation}</span>
              {post.itinerary.map((day, idx) => {
                return (
                  <div key={idx} className="day-block">
                    <h3>Day {day.day_number}</h3>
                    <p><strong>Places Visited:</strong> {day.places_visited_each_day.map(p => p.place_visited).join(', ')}</p>
                    <p><strong>Restaurants:</strong> {day.restaurants.join(', ')}</p>
                    <p><strong>Mode of Transport:</strong> {day.mode_of_transport}</p>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewPage;
