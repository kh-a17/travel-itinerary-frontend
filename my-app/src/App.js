import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import HomePage from './components/HomePage';
import SearchAndFilter from './components/SearchAndFilter'; // import
import SubmissionFilters from './components/Submission-Filters/Submission-Filters';
import SubmitItinerary from './components/Submit-Itinerary/Submit-Itinerary';
import ViewPage from './components/ViewPage/ViewPage'
import ChoosePostType from './components/ChoosePostType/ChoosePostType'
import VoiceInput from './components/Speech-to-Text/SpeechToText'
import ThankYou from './components/ThankYou';
import OwnItinerary from './components/OwnItinerary';
import MatchSolo from './components/MatchSolo'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchAndFilter />} /> {/* route for your component */}
        <Route path="/post-filters" element={<SubmissionFilters />} />
        <Route path="/submit-itinerary" element={<SubmitItinerary />} />
        <Route path="/view-post" element={<ViewPage />} />
        <Route path="/post-type" element={<ChoosePostType />} />
        <Route path="/speech-to-text" element={<VoiceInput />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/own-itinerary" element={<OwnItinerary />} />
        <Route path="/match-solo" element={<MatchSolo />} />
      </Routes>
    </Router>
  );
}

export default App;
