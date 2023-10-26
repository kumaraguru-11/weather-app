import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Current from "./component/Current";
import Forecast from "./component/WeatherForecast";

function App() {
  const [city, setCity] = useState("");
  const [selectedcity, setSelectedCity] = useState("");
  const [citySuggestion, setCitySuggestion] = useState([]);
  const [currentData, setCurrentData] = useState();
  const [forecast, setForecast] = useState();
  const index = selectedcity.indexOf(",");
  useEffect(() => {
    const getData = setTimeout(() => {
      if (city.length > 2 && city !== selectedcity) {
        axios
          .get(
            `https://api.weatherapi.com/v1/search.json?key=271bb191aa3244c2ab462853232410&q=${city}`
          )
          .then((res) => {
            const cityDataSuggestion = res.data.map(
              (cityname) =>
                `${cityname.name},${cityname.region},${cityname.country}`
            );
            setCitySuggestion(cityDataSuggestion);
          })
          .catch((err) => console.log(err));
      } else {
        setCitySuggestion([]);
      }
    }, 1000);

    return () => clearTimeout(getData);
  }, [city, selectedcity]);

  const FetchWeather = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=271bb191aa3244c2ab462853232410&q=${city}&days=7&aqi=no&alerts=no`
      )
      .then((res) => {
        setCurrentData(res.data.current);
        setForecast(res.data.forecast);
        //  if (!res.data || !res.data.current || !res.data.forecast) {
        //    setCurrentData(null);
        //    setForecast(null);
        //  } else {
        //    setCurrentData(res.data.current);
        //    setForecast(res.data.forecast);
        //  }
      })
      .catch((err) => console.log(err));
  };

  const handleSelectCity = (selectedcity) => {
    setCity(selectedcity);
    setSelectedCity(selectedcity);
    setCitySuggestion([]);
    FetchWeather();
  };

  const handleClearInputField = () => {
    if (city) {
      setCity("");
      setCurrentData(null);
      setForecast(null);
      setSelectedCity("");
    }
  };
  console.log(forecast);
  return (
    <div className="App">
      <div className="header">Weather Report</div>
      <div className="App-header">
        <input
          type="text"
          name="city"
          value={city}
          placeholder="Enter the city..."
          className="inputBox"
          onChange={(e) => setCity(e.target.value)}
          onClick={() => handleClearInputField()}
        />
        {citySuggestion.length > 0 && (
          <div className="suggestedWrapper">
            {citySuggestion.map((val) => (
              <div
                key={val}
                className="suggestion"
                onClick={() => handleSelectCity(val)}
              >
                {val}
              </div>
            ))}
          </div>
        )}
        {selectedcity === "" &&
          city !== "" &&
          citySuggestion[0] === undefined && (
            <div className="notFoundMessage">Not Found in DataBase</div>
          )}
        <div className="CityWeather">
          {selectedcity && city
            ? `${selectedcity.slice(0, index)} Weather Report`
            : ""}
        </div>
        {currentData && <Current currentData={currentData} />}
        {forecast && <Forecast forecast={forecast.forecastday} />}
      </div>
    </div>
  );
}

export default App;
