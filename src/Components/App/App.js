import { useState, useEffect } from "react";
import './App.css';
import { SearchBar } from "../SearchBar/SearchBar";
import { DisplayCurrentWeather } from "../DisplayWeather/DisplayCurrentWeather";
import { DisplayHourlyWeather } from "../DisplayWeather/DisplayHourlyWeather";
import { DisplayDailyWeather } from "../DisplayWeather/DisplayDailyWeather";
import { getGeoInfo, getCityName } from "../../Utilities/GeoData";
import { getWeatherInfo } from "../../Utilities/GetWeather";


function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [location, setLocation] = useState("");
  // const [httpStatusCodes, setHttpStatusCodes] = useState([]);

  const getGeoWeather = () => {
    getGeoInfo(searchTerm.label).then(({ latitude, longitude, location }) => {
      setLocation(location);
      getWeatherInfo(longitude, latitude).then(({ timezone, current, daily, hourly }) => {
        setTimezone(timezone);
        setCurrentWeather(current);
        setDailyWeather(daily);
        setHourlyWeather(hourly);
      });
    });
  }

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (pos) => {
      let crd = pos.coords;
      const latitude = crd.latitude.toFixed(6);
      const longitude = crd.longitude.toFixed(6);

      getWeatherInfo(longitude, latitude).then(({ timezone, current, daily, hourly }) => {
        setTimezone(timezone);
        setCurrentWeather(current);
        setDailyWeather(daily);
        setHourlyWeather(hourly);
      });

      getCityName(latitude, longitude).then((cityName) => {
        setLocation(cityName);
        setSearchTerm({ value: cityName });
      });
    }
    
    const errors = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    if (navigator.geolocation) {
      navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        if (result.state === "granted") {
          console.log(result.state);
          navigator.geolocation.getCurrentPosition(success);
        } else if (result.state === "prompt") {
          console.log(result.state);
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "denied") {
          console.log(result.state);
        }
      })
    } else {
      alert("Sorry, your device doesn't support geolocation.")
    }
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();
    getGeoWeather();
  }

  return (
    <main>
      <SearchBar 
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        handleSubmit={handleSubmit}
        />
      <div id="weather-display">
        {(!DisplayCurrentWeather) && <p>Loading...</p>} 
        <DisplayCurrentWeather
          currentWeather={currentWeather}
          timezone={timezone}
          location={location}
          
        />
        <DisplayHourlyWeather
          hourlyWeather={hourlyWeather}
          timezone={timezone}
        />
        <DisplayDailyWeather
          dailyWeather={dailyWeather} 
          
        />
      </div>
      {/* <div id="400-page">
        <p>Did you type something wrong?<br></br>We don't seem to find a place matching what you typed. <br></br>Please try again.</p>
      </div> */}
    </main>  
  )
}

export default App;
