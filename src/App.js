import React, { useEffect, useState } from "react";

import "./App.css";
import Weathercard from "./components/Weathercard";

const App = () => {
  const[searchValue, setSearchValue] = useState("pune");
  const[tempInfo, setTempInfo] = useState("");

  const getWeatherInfo = async () => {
    try{
      let API_URL = process.env.REACT_APP_OPENWEATHER_API_KEY;
      let API_KEY = process.env.REACT_APP_WEATHER_API_ID;

      const url =  `${API_URL}?q=${searchValue}&units=metric&appid=${API_KEY}`;
      
      let res = await fetch(url); 
      let data = await res.json();

      const{ temp, humidity, pressure } = data.main;
      const{ main:weathermood } = data.weather[0];
      const{name} = data;
      const{speed} = data.wind;
      const{country, sunset} = data.sys;
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      //console.log(temp);
      //console.log(data);
      setTempInfo(myNewWeatherInfo);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search</button>
        </div>
      </div>
      <Weathercard {...tempInfo} />
    </>

  );
}

export default App;