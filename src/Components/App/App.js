import { useState } from "react";
import './App.css';
import { SearchBar } from "../SearchBar/SearchBar";
import { DisplayCurrentWeather } from "../DisplayWeather/DisplayCurrentWeather";
import { DisplayHourlyWeather } from "../DisplayWeather/DisplayHourlyWeather";
import { DisplayDailyWeather } from "../DisplayWeather/DisplayDailyWeather";

const weatherUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = "62ebb02f66f4c684e38253b126fa394c";
const geoUrl = "https://maps.googleapis.com/maps/api/geocode/json?";
const geoApiKey = "AIzaSyBZrejx_2seANji9k--cgRvzep2KIfJrrw";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = ({target}) => {
      setSearchTerm(target.value);
  }

  const [timezone, setTimezone] = useState("UTC");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [httpStatusCodes, setHttpStatusCodes] = useState([]);
  const [location, setLocation] = useState("");

  const sendApiRequest = () => {
    const geoEndPoint = geoUrl + "address=" + searchTerm + "&key=" + geoApiKey;
    fetch(geoEndPoint).then((response) => {
      setHttpStatusCodes(prev => [response.status, ...prev]);
      console.log(response.status);
      if (response.ok) {
        return response.json();
      }
      throw new Error("Oops, something went wrong!");
    }, networkError => {
        console.log(networkError.message)
    }).then(jsonResponse => {
      const lattitude = jsonResponse.results[0].geometry.location.lat;
      const longtitude = jsonResponse.results[0].geometry.location.lng;
      const weatherEndpoint = weatherUrl + "onecall?lat=" + lattitude + "&lon=" + longtitude + "&exclude=minutely,alerts&appid=" + apiKey + "&units=metric";
      setLocation(jsonResponse.results[0].formatted_address);
      return fetch(weatherEndpoint);
    }).then(response => {
      setHttpStatusCodes(prev => [response.status, ...prev]);
      console.log(response.status);
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
      {(httpStatusCodes[0] === 200 && httpStatusCodes[1] === 200) && <div id="weather-display">
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
      </div>}
      {httpStatusCodes[1] === 400 && <div id="400-page">
        <p>Did you type something wrong?<br></br>We don't seem to find a place matching what you typed. <br></br>Please try again.</p>
      </div>}
    </main>  
  )
}

export default App;
