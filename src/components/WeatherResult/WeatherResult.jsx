import React from "react";
import "./WeatherResult.css";

export const WeatherResult = ({response}) => {
  return (
    <div className="results">
       {response.name}
       <br />
       {response.main.temp} &#x2103;
       <br />
       {response.main.pressure}&nbsp;hpa
       <br />
       {response.main.humidity}&nbsp;%
    </div>
  );
}