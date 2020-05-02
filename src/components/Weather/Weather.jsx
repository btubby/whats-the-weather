import React, { useState, useEffect, useRef } from "react";
import { WeatherResult } from "../WeatherResult/WeatherResult";
import "./Weather.css";
import { refreshTimeoutSeconds, apiKey } from "../../App";

export const Weather = () => {
  const isMounted = useRef(false);

  const [location, setLocation] = useState("");
  const [wantsKelvin, setwantsKelvin] = useState(false);
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
      resetTimeout();
      fetchData(previouslocation);
    }
  }, [seconds]);

  const handleSubmit = (event) => {
    event.preventDefault();
    resetTimeout();
    fetchData(location);
    setLocation(""); // clear the form field
  };

  const resetTimeout = () => {
    setSeconds(refreshTimeoutSeconds);
  };

  const fetchData = (location) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        handleApiResponse(data);
      })
      .catch((error) => {
        setError(error);
      });
    setPreviousLocation(location);
  };

  const handleApiResponse = (json) => {
    if (json.cod === 200) {
      // API returns a successful response code as a number, but a 4?? as a string
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
      json.cod === "404" && setError(json.message); // city not found
      json.cod === "400" && setError(json.message); // Nothing to geocode
    }
  };

  const searchHistoryContainers = searchHistory
    .slice(0)
    .reverse()
    .map(function (searchItem, i) {
      return (
        <div className="search-Item" key={i}>
          <WeatherResult
            searchItem={searchItem}
            searchHistory={true}
            wantsKelvin={wantsKelvin}
          />
        </div>
      );
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
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              autoFocus={true}
            />
          </span>
          <input
            type="checkbox"
            id="temperature-unit"
            onChange={(e) => setwantsKelvin(e.target.checked)}
            checked={wantsKelvin}
          />
          <label className="display-kelvin" htmlFor="temperature-unit">
            Display temperatures in Kelvin
          </label>
        </form>
        {hasError && <h4>{hasError}</h4>}
        {apiResponse && apiResponse.main && (
          <WeatherResult
            searchItem={apiResponse}
            searchHistory={false}
            wantsKelvin={wantsKelvin}
          />
        )}
        {apiResponse && !hasError && (
          <div className="refresh">Refreshing in {seconds}s</div>
        )}
      </div>
      <div className="search-history">{searchHistoryContainers}</div>
    </div>
  );
};
