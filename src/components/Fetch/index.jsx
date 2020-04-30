import React, { useState, useEffect } from "react";

const Fetch = (props) => {
  const [hasError, setError] = useState(false);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    // code to run on component mount
    // TODO use body in requestOptions here
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${props.location}&appid=d998d14dfeef009350f02aa843ee9bce`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(JSON.stringify(myJson));
        setWeather(myJson);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, []);

  return (
    <div>
      And the weather in {props.location} is going to....
      <p />
      {JSON.stringify(weather)}
    </div>
  );
};

export default Fetch;
