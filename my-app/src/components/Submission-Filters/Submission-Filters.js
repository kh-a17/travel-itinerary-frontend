import { useState } from 'react';
import './SubmissionFilters.css';
import FilterTile from '../filter-tile/FilterTile'
import { useNavigate } from 'react-router-dom';

const SubmissionFilters = () => {
  const navigate = useNavigate();

  const [filter, selectFilter] = useState('city');

  const filterSelected = (selectedFilter) => {
    if (filter === 'city') {
      localStorage.setItem('cityName', selectedFilter); // Store the selected age range
    }
    else if (filter === 'age') {
      localStorage.setItem('age', selectedFilter); // Store the selected age range
      selectFilter('group');
    }
    else if (filter === 'group') {
      localStorage.setItem('group', selectedFilter); // Store the selected group type
      selectFilter('season');
    }
    else if (filter === 'season') {
      localStorage.setItem('season', selectedFilter); // Store the selected season
      selectFilter('budget');
    }
    else if (filter === 'budget') {
      localStorage.setItem('budget', selectedFilter); // Store the selected budget
      navigate('/submit-itinerary');
    }
  }

  return (
    <div className="submission-wrapper">
      <form>
        {filter === 'city' && <div>
          <h1>Name of the city</h1>
          <div className='input-button-wrapper'>
            <input
              type="text"
              placeholder="Name of the city"
              className='input-text-wrapper'
              onBlur={(e) => filterSelected(e.target.value)} // Default rating of 5
            />
            <button className='button-style' onClick={() => selectFilter('age')}>Next</button>
          </div>
        </div>}
        {filter === "age" && <div>
          <h1>Age</h1>
          <div className="filter-wrapper">
            <FilterTile filter="20-30" filterSelected={() => filterSelected('20-30')} />
            <FilterTile filter="30-40" filterSelected={() => filterSelected('30-40')} />
            <FilterTile filter="40-50" filterSelected={() => filterSelected('40-50')} />
            <FilterTile filter="50-60" filterSelected={() => filterSelected('50-60')} />
          </div>
        </div>}
        {filter === "group" && <div>
          <h1>Group</h1>
          <div className="filter-wrapper">
            <FilterTile filter="Solo" filterSelected={() => filterSelected('Solo')} />
            <FilterTile filter="Family" filterSelected={() => filterSelected('Family')} />
            <FilterTile filter="Honeymoon" filterSelected={() => filterSelected('Honeymoon')} />
            <FilterTile filter="Work" filterSelected={() => filterSelected('Work')} />
            <FilterTile filter="Friends" filterSelected={() => filterSelected('Friends')} />
          </div>
        </div>}
        {filter === "season" && <div>
          <h1>Season</h1>
          <div className="filter-wrapper">
            <FilterTile filter="Spring" filterSelected={() => filterSelected('Spring')} />
            <FilterTile filter="Summer" filterSelected={() => filterSelected('Summer')} />
            <FilterTile filter="Fall" filterSelected={() => filterSelected('Fall')} />
            <FilterTile filter="Winter" filterSelected={() => filterSelected('Winter')} />
          </div>
        </div>}
        {filter === "budget" && <div>
          <h1>Budget</h1>
          <div className="filter-wrapper">
            <FilterTile filter="500-1000" filterSelected={() => filterSelected('500-1000')} />
            <FilterTile filter="1000-2000" filterSelected={() => filterSelected('1000-2000')} />
            <FilterTile filter="2000-3000" filterSelected={() => filterSelected('2000-3000')} />
            <FilterTile filter="3000-4000" filterSelected={() => filterSelected('3000-4000')} />
            <FilterTile filter="4000-5000" filterSelected={() => filterSelected('4000-5000')} />
            <FilterTile filter="5000-6000" filterSelected={() => filterSelected('5000-6000')} />
          </div>
        </div>}
      </form>
    </div>
  );
}

export default SubmissionFilters;
