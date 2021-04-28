import { useState, useEffect } from "react";
import './App.css';
import { SearchBar } from "../SearchBar/SearchBar";
import { DisplayCurrentWeather } from "../DisplayWeather/DisplayCurrentWeather";
import { DisplayHourlyWeather } from "../DisplayWeather/DisplayHourlyWeather";
import { DisplayDailyWeather } from "../DisplayWeather/DisplayDailyWeather";
import { getGeoInfo, getCityName } from "../../Utilities/GeoData";
import { getWeatherInfo } from "../../Utilities/GetWeather";


function App() {

  const dayOrNight = () => {
    if (currentWeather) {
      const myDateTime = new Date(currentWeather.dt*1000).toLocaleString('en-GB', { timeZone: timezone });
      const myTime = parseInt(myDateTime.substring(myDateTime.length-8, myDateTime.length-6));
      const weather = currentWeather.weather[0].main;
      console.log(weather);
      console.log(myTime);
      if (myTime > 6 && myTime < 19) {
        switch (weather) {
          case "Clouds": 
            document.getElementById("weather-page").className = "cloudy";
            break;
          case "Clear":
            document.getElementById("weather-page").className = "clear";
            break;
          case "Rain":
            document.getElementById("weather-page").className = "rainy";
            break;
          default:  
            document.getElementById("weather-page").className = "day";
            break;
        }
      } else {
        document.getElementById("weather-page").className = "night";
      }
    } 
  }

  const [currentWeather, setCurrentWeather] = useState(null);
  useEffect(() => {
    dayOrNight();
  }, [currentWeather]);

  const [searchTerm, setSearchTerm] = useState(null);
  const [timezone, setTimezone] = useState("UTC");
  const [location, setLocation] = useState("London");
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getGeoWeather = () => {
    getGeoInfo(searchTerm.label).then(({ latitude, longitude, location }) => {
      setLocation(location);
      getWeatherInfo(longitude, latitude).then(({ timezone, current, daily, hourly }) => {
        setTimezone(timezone);
        setCurrentWeather(current);
        setDailyWeather(daily);
        setHourlyWeather(hourly);
        setIsLoading(false);
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
          navigator.geolocation.getCurrentPosition(success);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "denied") {
          console.log(result.state);
        }
      })
    } else {
      console.log("Device doesn't support geolocation")
    }
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm) {
      setIsLoading(true);
      getGeoWeather();
    }
    return;
  }

  return (
    <main id="weather-page">
      
      <SearchBar 
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        handleSubmit={handleSubmit}
        />
      <div id="weather-display">
        {isLoading && <p id="loading-message">Loading...</p>}

        {!isLoading && <DisplayCurrentWeather
          currentWeather={currentWeather}
          timezone={timezone}
          location={location}         
        />}
        {!isLoading && <DisplayHourlyWeather
          hourlyWeather={hourlyWeather}
          timezone={timezone}
        />}
        {!isLoading && <DisplayDailyWeather
          dailyWeather={dailyWeather}         
        />}
      </div>
    </main>  
  )
}

export default App;
