import { useState } from "react";
import './App.css';
import { SearchBar } from "../SearchBar/SearchBar";
import { DisplayCurrentWeather } from "../DisplayWeather/DisplayCurrentWeather";
import { DisplayHourlyWeather } from "../DisplayWeather/DisplayHourlyWeather";
import { DisplayDailyWeather } from "../DisplayWeather/DisplayDailyWeather";

const weatherUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = "62ebb02f66f4c684e38253b126fa394c";
const geoUrl = "https://geocode.xyz/?locate=";
const geoPrams = "&geoit=JSON";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = ({target}) => {
      setSearchTerm(target.value);
  }

  const [timezone, setTimezone] = useState("UTC");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);

  const sendApiRequest = () => {
    const geoEndPoint = geoUrl + searchTerm + geoPrams;
    fetch(geoEndPoint).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Oops, something went wrong!");
    }, networkError => {
        console.log(networkError.message)
    }).then(jsonResponse => {
      const weatherEndpoint = weatherUrl + "onecall?lat=" + jsonResponse.latt + "&lon=" + jsonResponse.longt + "&exclude=minutely,alerts&appid=" + apiKey + "&units=metric";
      return fetch(weatherEndpoint);
    }).then(response => {
      if (response.ok) {
      return response.json();
    }
    throw new Error("Oops, something went wrong!");
  }, networkError => {
      console.log(networkError.message)
  }).then (jsonResponse => {
    setCurrentWeather(jsonResponse.current);
    setHourlyWeather(jsonResponse.hourly);
    setDailyWeather(jsonResponse.daily);
    setTimezone(jsonResponse.timezone);
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendApiRequest();
  }

  return (
    <main>
      <SearchBar 
        handleChange={handleChange}
        searchTerm={searchTerm}
        handleSubmit={handleSubmit}
        />
      <div id="weather-display">
        <DisplayCurrentWeather
          currentWeather={currentWeather}
          searchTerm={searchTerm}
          timezone={timezone}
          
        />
        <DisplayHourlyWeather
          hourlyWeather={hourlyWeather}
          timezone={timezone}
        />
        <DisplayDailyWeather
          dailyWeather={dailyWeather} 
          timezone={timezone}
        />
      </div>
    </main>  
  )
}

export default App;
