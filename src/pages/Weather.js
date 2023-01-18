import axios from "axios";
import React, { useEffect, useState } from "react";
import weatherDescKo from "../weatherKo";

const Weatehr = () => {
  useEffect(() => {
    axios({
      url: "https://api.openweathermap.org/data/2.5/weather?lat=35.8713&lon=128.6018&appid=23bf88aa74df86ef78d133251927dd72",
    }).then((res) => {
      console.log(res.data);
      const cityName = res.data.name;
      setCity(cityName);
      const temperatureK = res.data.main.temp;
      const temperatureC = (temperatureK - 273.15).toFixed(1);
      setTemp(temperatureC);
      console.log(temperatureC);
      console.log(res.data.weather[0].icon);
      console.log(res.data.weather[0].id);
      const weatehrId = res.data.weather[0].id;
      setWeatherid(weatehrId);
      const icon = res.data.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      setWeatherImg(iconURL);
    });
  }, []);

  const [weatherid, setWeatherid] = useState();
  const [city, setCity] = useState();
  const [temp, setTemp] = useState();
  const [weatherImg, setWeatherImg] = useState();

  const 한글날씨 = weatherDescKo.map((item) => {
    console.log(item);
    return item[weatherid];
  });

  return (
    <div>
      <h1>{city}의 날씨</h1>
      <h2>{temp}℃</h2>
      <img src={weatherImg} alt="weathrImg" />
      <h3>{한글날씨}</h3>
    </div>
  );
};

export default Weatehr;
