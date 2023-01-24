import axios from "axios";
import React, { useEffect, useState } from "react";
import weatherDescKo from "../weatherKo";

const Home = () => {
  const [weatherid, setWeatherid] = useState();
  const [city, setCity] = useState();
  const [temp, setTemp] = useState();
  const [weatherImg, setWeatherImg] = useState();

  const weatherURL =
    "https://api.openweathermap.org/data/2.5/weather?lat=35.8713&lon=128.6018&appid=23bf88aa74df86ef78d133251927dd72";

  useEffect(() => {
    axios
      .get(weatherURL)
      .then((res) => {
        const temperatureK = res.data.main.temp;
        const temperatureC = (temperatureK - 273.15).toFixed(1);
        const icon = res.data.weather[0].icon;
        setCity(res.data.name);
        setTemp(temperatureC);
        setWeatherid(res.data.weather[0].id);
        setWeatherImg("http://openweathermap.org/img/wn/" + icon + "@2x.png");
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const koWeather = weatherDescKo.map((item) => {
    return item[weatherid];
  });

  return (
    <div>
      <h1>{city}의 날씨</h1>
      <h2>{temp}℃</h2>
      <img src={weatherImg} alt="weathrImg" />
      <h3>{koWeather}</h3>
    </div>
  );
};

export default Home;
