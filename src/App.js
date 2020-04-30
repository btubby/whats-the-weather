import React, { useState, useEffect, useRef } from "react";
import { ExampleComp } from "./components/Example"; // TODO: Replace this with your application code

import "./App.css";

const App = () => {
  const Apikey = "d998d14dfeef009350f02aa843ee9bce";
  const refreshTimeoutSeconds = 60;

  const [location, setLocation] = useState("");
  const [hasError, setError] = useState(false);
  const [weather, setWeather] = useState();
  const [timeFetched, setTimeFetched] = useState();
  const [seconds, setSeconds] = useState(refreshTimeoutSeconds);

  // Side effect to set (and clear) a new timer each time a valid location is entered
  // Don't set timer on component mount
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current && !hasError) {
      console.log("fetching");
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      isMounted.current = true;
    }
  }, [location, weather]);

  // Side effect to make a new API call when the minute timer is up
  useEffect(() => {
    if (seconds <= 0) {
      resetInterval();
      fetchData();
    }
  }, [seconds]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
    resetInterval();
  };

  const resetInterval = () => {
    setSeconds(refreshTimeoutSeconds);
    setTimeFetched(new Date().getMinutes());
  };

  const fetchData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${Apikey}&units=metric`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.cod = 404 && setError(json.message); // city not found
        json.cod = 400 && setError(json.message); // Nothing to geocode
        json.cod = 200 && setWeather(json);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    // TODO: Replace this with your application code
    <div className="App">
      Your Weather
      <form onSubmit={handleSubmit}>
        <label>
          Enter your location:&nbsp;
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
      </form>
      {hasError && <h2>ERROR: {hasError}</h2>}
      {weather && weather.weather && (
        <>
          TIME: {timeFetched}
          <br />
          {weather.name}
          <br />
          {weather.main.temp} &#x2103;
          <br />
          {weather.main.pressure}&nbsp;hpa
          <br />
          {weather.main.humidity}&nbsp;%
        </>
      )}
      <h4>refreshing in {seconds} seconds..</h4>
      <ExampleComp />
    </div>
  );
};

export default App;
