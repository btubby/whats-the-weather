import React from "react";
import "./WeatherResult.css";

export const celciusToKelvin = (tempInC) => {
  return tempInC + 273.15;
};
export const WeatherResult = ({ searchItem, searchHistory, wantsKelvin }) => {
  const displayTemperature = (wantsKelvin
    ? celciusToKelvin(searchItem.main.temp)
    : searchItem.main.temp
  ).toFixed(2);
  const displayTempUnit = wantsKelvin ? "K" : String.fromCharCode(8451);
  if (searchHistory) {
    return (
      <div className="search-result-history">
        {searchItem.name}
        <br />
        {displayTemperature}
        {displayTempUnit}, {searchItem.main.pressure}hpa,{" "}
        {searchItem.main.humidity}%
      </div>
    );
  } else {
    return (
      <div className="search-result">
        {searchItem.name}
        <br />
        {displayTemperature} {displayTempUnit}
        <br />
        {searchItem.main.pressure} hpa
        <br />
        {searchItem.main.humidity} %
      </div>
    );
  }
};
