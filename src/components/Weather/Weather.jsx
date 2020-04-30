import React, { useState, useEffect, useRef } from "react";
import { WeatherResult } from "../WeatherResult/WeatherResult";
import "./Weather.css";

export const Weather = (props) => {
  const refreshTimeoutSeconds = 60;
  const isMounted = useRef(false);

  const [location, setLocation] = useState("");
  const [previouslocation, setPreviousLocation] = useState("");
  const [hasError, setError] = useState(false);
  const [apiResponse, setApiResponse] = useState();
  const [seconds, setSeconds] = useState(refreshTimeoutSeconds);
  const [searchHistory, setSearchHistory] = useState([]);

  // Side effect to set (and clear) a new timer each time a valid location is entered
  // Don't set timer on component mount
  useEffect(() => {
    if (isMounted.current && !hasError) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      isMounted.current = true;
    }
  }, [location, apiResponse]);

  // Side effect to make a new API call when the timer is up
  useEffect(() => {
    if (seconds <= 0) {
      resetInterval();
      fetchData(previouslocation);
      
    }
  }, [seconds]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(location);
    resetInterval();
    setLocation('');
  };

  const resetInterval = () => {
    setSeconds(refreshTimeoutSeconds);
  };

  const handleApiResponse = (json) => {
    if (json.cod === 200) { // API returns a successful response code as a number, but a 4?? as a string
      setError(undefined);

      if (apiResponse) {
        // if we have a previous result, add it to the history array and store
        searchHistory.push(apiResponse);
        setSearchHistory(searchHistory);
      }
      if (searchHistory.length >= 6) {
        searchHistory.shift();
        setSearchHistory(searchHistory);
      }
      setApiResponse(json);

    } else {
      setApiResponse(undefined); 
      json.cod === '404' && setError(json.message); // city not found
      json.cod === '400' && setError(json.message); // Nothing to geocode
    }
  }

  const fetchData = (location) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${props.apiKey}&units=metric`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        handleApiResponse(json);
      })
      .catch((error) => {
        setError(error);
      });
      // save the location as we may need to repeat the search after refreshTimeoutSeconds
      setPreviousLocation(location);
  };

  const searchHistoryContainers = searchHistory.slice(0).reverse().map(function(searchItem){
    return (
      <div className="search-Item">
        <WeatherResult searchItem={searchItem} flatDisplay={true}/>
      </div>
    )
  });

  return (
    <div className="wrapper">
      <div className="weather">
        <form onSubmit={handleSubmit}>
          <label className="left" htmlFor="location">
            Enter your location:&nbsp;
          </label>
          <span className="left2">
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            autoFocus={true}
          />
          </span>
        </form>
        {hasError && <h4>{hasError}</h4>}
        {apiResponse && apiResponse.main && (
          <WeatherResult searchItem={apiResponse} flatDisplay={false}/>
        )}
        {apiResponse && !hasError &&
          <div className="refresh">
            Refreshing in {seconds}s
          </div> 
        }
      </div>
      <div className="search-history">
        {searchHistoryContainers}
      </div>
    </div>
  );
};
