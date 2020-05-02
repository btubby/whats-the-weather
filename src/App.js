import React from "react";
import Weather from "./components/Weather/";
import "./App.css";

export const refreshTimeoutSeconds = 60;
export const apiKey = "<OpenWeatherMap apiKey>"; // replace with your own apiKey

const App = () => {
  return (
    <div className="App">
      <div className="Container">
        <div className="App-header">Your Weather</div>
        <Weather />
      </div>
    </div>
  );
};

export default App;
