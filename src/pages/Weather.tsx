import React, { useEffect, useState } from "react";
import weatherDescKo from "../weatherKo";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

interface forWeather {
  lat: number;
  lon: number;
  appid: string | undefined;
}

const Home = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const [weatherid, setWeatherid] = useState<number>(0);
  const [city, setCity] = useState();
  const [temp, setTemp] = useState<number | string>("");
  const [weatherImg, setWeatherImg] = useState<string>("");

  const APPID = process.env.REACT_APP_APPID;

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather`;

  useEffect(() => {
    const params: forWeather = {
      lat: state.lat,
      lon: state.lon,
      appid: APPID,
    };
    axios
      .get(weatherURL, { params: params })
      .then((res) => {
        const temperatureK = res.data.main.temp;
        const temperatureC: string = (temperatureK - 273.15).toFixed(1);
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

  const gotoMap = () => {
    navigate("/map", { state: { lat: state.lat, lon: state.lon } });
  };

  return (
    <div>
      <h1>{city}의 날씨</h1>
      <h2>{temp}℃</h2>
      <img src={weatherImg} alt="weathrImg" />
      <h3>{koWeather}</h3>
      <button onClick={gotoMap}>지역 변경</button>
    </div>
  );
};

export default Home;
