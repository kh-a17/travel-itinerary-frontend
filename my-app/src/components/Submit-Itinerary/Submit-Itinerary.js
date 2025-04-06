import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Submit-Itinerary.css';
import StarRating from '../StarRating/StarRating';
import FilterTile from '../filter-tile/FilterTile';
import InputBox from '../input-box/InputBox';

const SubmitItinerary = () => {
  const [noOfDays, selectNonOfDays] = useState([])
  const [formSubmit, setFormSubmit] = useState(false)
  const [itineraryDetails, setItineraryDetails] = useState([]); // State to store details of each day

  const navigate = useNavigate();

  const nonOfDaysSelected = (noOfDaysSelect) => {
    const list = [];
    for (let i = 1; i <= noOfDaysSelect; i++) {
      list.push(i);
    }
    selectNonOfDays(list);
  };

  function handleDataFromChild(data) {
    localStorage.setItem('acco', data)
  }

  // Handle places visited data
  const handlePlacedVisited = (day, place, rating) => {
    const updatedDetails = [...itineraryDetails];
    if (!updatedDetails[day]) {
      updatedDetails[day] = { places_visited: [], restaurants: [], mode_of_transport: "" };
    }
    updatedDetails[day].places_visited.push({ place_visited: place, rating });
    setItineraryDetails(updatedDetails);
  };

  // Handle restaurants data
  const handleRestaurantData = (day, restaurant) => {
    const updatedDetails = [...itineraryDetails];
    if (!updatedDetails[day]) {
      updatedDetails[day] = { places_visited: [], restaurants: [], mode_of_transport: "" };
    }
    updatedDetails[day].restaurants.push(restaurant);
    setItineraryDetails(updatedDetails);
  };

  // Handle transport mode data
  const handleModeOfTransport = (day, transportMode) => {
    const updatedDetails = [...itineraryDetails];
    updatedDetails[day].mode_of_transport = transportMode;
    setItineraryDetails(updatedDetails);
  };

  // Prepare data to be sent to API
  const prepareItineraryData = () => {
    const itinerary = noOfDays.map((day, index) => ({
      day_number: day,
      places_visited_each_day: itineraryDetails[index]?.places_visited || [],
      restaurants: itineraryDetails[index]?.restaurants || [],
      mode_of_transport: itineraryDetails[index]?.mode_of_transport || "",
    }));

    return {
      city_name: localStorage.getItem('cityName'),  // Static value or replace it with user input if needed
      age: localStorage.getItem('age'),
      group: localStorage.getItem('group'),
      season: localStorage.getItem('season'),
      budget: localStorage.getItem('budget'),
      accomodation: localStorage.getItem('acco'), // Get accommodation from the state
      no_of_days: noOfDays.length,
      itinerary: itinerary,
    };
  };

  const onSubmit = async () => {
    setFormSubmit(true);

    const itineraryData = prepareItineraryData();

    try {
      // Send the data to the backend via a POST request
      const response = await fetch('https://travel-itinerary-backend-lxhm.onrender.com/api/posts/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(itineraryData), // Send data as JSON
      });

      // Check if the request was successful
      if (response.ok) {
        console.log('Itinerary posted successfully');
        navigate('/post-type');
      } else {
        console.error('Failed to submit itinerary');
      }
    } catch (error) {
      console.error('Error occurred while submitting itinerary:', error);
    }
  };

  return (
    <div className="submit-post-wrapper">
      {noOfDays.length <= 0 ? (
        <>
          <h2>Number of days travelled:</h2>
          <div className="filter-wrapper">
            <FilterTile filter="1" filterSelected={() => nonOfDaysSelected(1)} className="square-tile" />
            <FilterTile filter="2" filterSelected={() => nonOfDaysSelected(2)} className="square-tile" />
            <FilterTile filter="3" filterSelected={() => nonOfDaysSelected(3)} className="square-tile" />
            <FilterTile filter="4" filterSelected={() => nonOfDaysSelected(4)} className="square-tile" />
            <FilterTile filter="5" filterSelected={() => nonOfDaysSelected(5)} className="square-tile" />
          </div>

          <h2>Accomodation</h2>
          <div>
            <div class="filter-wrapper">
              <input
                type="text"
                placeholder="Hidden gems to explore"
                className='input-text-wrapper'
                onBlur={(e) => handleDataFromChild(e.target.value)} // Default rating of 5
              />
            </div>
          </div>
        </>
      ) : (
        <div>
          <div class="day-wise-wrapper">
            {noOfDays.map((key, index) => {
              return (
                <div className='day-wrapper' style={{ width: `${100 / noOfDays.length}%` }}>
                  <div className='day-label'>Day {key}</div>
                  <form className='form-wrapper'>
                    <label>Please list places visited in order:</label>
                    <input
                      type="text"
                      placeholder="Hidden gems to explore"
                      className='input-text-wrapper'
                      onBlur={(e) => handlePlacedVisited(index, e.target.value, 5)} // Default rating of 5
                    />
                    <input
                      type="text"
                      placeholder="Hidden gems to explore"
                      className='input-text-wrapper'
                      onBlur={(e) => handlePlacedVisited(index, e.target.value, 5)} // Default rating of 5
                    />
                    <input
                      type="text"
                      placeholder="Hidden gems to explore"
                      className='input-text-wrapper'
                      onBlur={(e) => handlePlacedVisited(index, e.target.value, 5)} // Default rating of 5
                    />
                    <input
                      type="text"
                      placeholder="Hidden gems to explore"
                      className='input-text-wrapper'
                      onBlur={(e) => handlePlacedVisited(index, e.target.value, 5)} // Default rating of 5
                    />
                    <input
                      type="text"
                      placeholder="Hidden gems to explore"
                      className='input-text-wrapper'
                      onBlur={(e) => handlePlacedVisited(index, e.target.value, 5)} // Default rating of 5
                    />
                    {/* Restaurants and Transport */}
                    <label>Restaurants</label>
                    <input
                      type="text"
                      placeholder="Cozy places to eat"
                      className='input-text-wrapper'
                      onBlur={(e) => handleRestaurantData(index, e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Cozy places to eat"
                      className='input-text-wrapper'
                      onBlur={(e) => handleRestaurantData(index, e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Cozy places to eat"
                      className='input-text-wrapper'
                      onBlur={(e) => handleRestaurantData(index, e.target.value)}
                    />

                    <label>Mode of Transport</label>
                    <input
                      type="text"
                      placeholder="How to roam around in cool way"
                      className='input-text-wrapper'
                      onBlur={(e) => handleModeOfTransport(index, e.target.value)}
                    />

                  </form>
                </div>
              );
            })}

          </div>
          <div className="filter-wrapper">
            <button onClick={onSubmit} className="submit-button">
              Submit Itinerary
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitItinerary;

 