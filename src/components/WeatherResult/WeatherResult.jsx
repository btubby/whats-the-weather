import React from "react";
import "./WeatherResult.css";

export const WeatherResult = ({searchItem, flatDisplay}) => {
  if (flatDisplay) {
    return (
      <div className="search-result-flat">
        {searchItem.name}, {searchItem.main.temp} &#x2103;, {searchItem.main.pressure} hpa
      </div>
    );
  } else {
    
    return (
      <div className="search-result">
       {searchItem.name}
       <br />
       {searchItem.main.temp} &#x2103;
       <br />
       {searchItem.main.pressure} hpa
       <br />
       {searchItem.main.humidity} %
      </div>
    );
   }
}