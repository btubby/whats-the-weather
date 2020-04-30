import React from "react";
import Weather from "./components/Weather/"; 
import "./App.css";

const App = () => {
  const apiKey = "d998d14dfeef009350f02aa843ee9bce";
  const refreshTimeoutSeconds = 10;

  return (
    <div className="App">
      <div className="Container">
        <div className="App-header">
          Your Weather
        </div>
        <Weather apiKey={apiKey} refreshTimeoutSeconds={refreshTimeoutSeconds}/>
      </div>
    </div>
  );
};

export default App;
