import axios from "axios";
import React, { useEffect, useState } from "react";

const Weatehr = () => {
  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.openweathermap.org/data/2.5/weather?lat=35.8713&lon=128.6018&appid=23bf88aa74df86ef78d133251927dd72",
    }).then((res) => {
      console.log(res.data);
      const cityName = res.data.name;
      setCity(cityName);
      const temperatureK = res.data.main.temp;
      const temperatureC = (temperatureK - 273.15).toFixed(2);
      setTemp(temperatureC);
      console.log(temperatureC);
      console.log(res.data.weather[0].description);
    });
  }, []);

  const [city, setCity] = useState();
  const [temp, setTemp] = useState();

  return (
    <div>
      <h1>{city}의 날씨</h1>
      <h2>{temp}℃</h2>
    </div>
  );
};

export default Weatehr;
