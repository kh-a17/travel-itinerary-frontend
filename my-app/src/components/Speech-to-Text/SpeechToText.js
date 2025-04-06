import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Speech-to-Text/SpeechToText.css';
import Navbar from '../Navbar'; // Navbar import

const VoiceInput = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [classifiedData, setClassifiedData] = useState(null);
  const recognitionRef = useRef(null);
  const tempTranscriptRef = useRef(''); // Temporary storage for speech input
  const navigate = useNavigate();

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in your browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = false; // Disable interim results to accumulate full text
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }
      tempTranscriptRef.current += finalTranscript; // Append recognized text to temp reference
    };

    recognition.onend = () => {
      setIsListening(false);
      setTranscript(tempTranscriptRef.current); // Update transcript state with full text
      classifySpeech(tempTranscriptRef.current); // Classify after stopping the recording
    };

    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop(); // Stop recording
  };

  const classifySpeech = (text) => {
    const data = {
      city_name: [],
      season: "",
      budget: "",
      age: "",
      restaurants: [],
      mode_of_transport: [],
      accomodation: 'N/A'
    };

    // List of sample places (expand as needed)
    const city_name = ['Paris', 'New York', 'London', 'Tokyo', 'Rome', 'Berlin', 'Dallas'];
    city_name.forEach((place) => {
      if (text.toLowerCase().includes(place.toLowerCase())) {
        data.city_name.push(place);
      }
    });

    // Seasons (Spring, Summer, Fall, Winter)
    const seasons = ['summer', 'winter', 'fall', 'spring'];
    seasons.forEach((season) => {
      if (text.toLowerCase().includes(season)) {
        data.season = season;
      }
    });

    // Approximate budget (numbers followed by a currency)
    const budgetMatch = text.match(/(\d{3,4})\s*(usd|dollars|euro|eur)/i);
    if (budgetMatch) {
      data.budget = `${budgetMatch[1]} ${budgetMatch[2]}`;
    }

    // User's age (finding numbers that might represent age)
    const ageMatch = text.match(/\b(\d{1,2})\b/); // Looks for 1 or 2 digit numbers
    if (ageMatch) {
      data.age = ageMatch[1];
    }

    // Restaurants visited (expand as needed)
    const restaurants = ['McDonalds', 'KFC', 'Pizza Hut', 'Sushi place', 'Burger King'];
    restaurants.forEach((restaurant) => {
      if (text.toLowerCase().includes(restaurant.toLowerCase())) {
        data.restaurants.push(restaurant);
      }
    });

    // Mode of transport (car, train, bus, etc.)
    const mode_of_transports = ['car', 'bus', 'train', 'plane', 'bike', 'walking'];
    mode_of_transports.forEach((mode) => {
      if (text.toLowerCase().includes(mode)) {
        data.mode_of_transport.push(mode);
      }
    });

    setClassifiedData(data); // Set the classified data
  };

  const handleSubmit = async () => {
    const itineraryData = classifiedData;

    try {
      // Send the data to the backend via a POST request
      const response = await fetch('http://localhost:5000/api/posts/create-post', {
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
        navigate('/thank-you');
      } else {
        console.error('Failed to submit itinerary');
      }
    } catch (error) {
      console.error('Error occurred while submitting itinerary:', error);
    }
  };

  return (
    <>
      <Navbar /> {/* Add Navbar at the top */}
      <div className='speech-to-text-wrapper' style={{ paddingTop: '100px' }}>
        <h3>Speak Your Experience</h3>
        <button onClick={isListening ? stopListening : startListening} className='button-style'>
          {isListening ? '🛑 Stop Listening' : '🎙️ Start Listening'}
        </button>
        <textarea
          rows="10"
          cols="80"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Please suggest places to visit, restaurants and how to roam around"
          className='text-area'
          readOnly
        />
        <button className='submit-button' onClick={handleSubmit}>
          Submit
        </button>

        {/* Display Classified Data */}
        {classifiedData && (
          <div className="classified-data">
            <h4>Classified Data:</h4>
            <pre>{JSON.stringify(classifiedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};

export default VoiceInput;
