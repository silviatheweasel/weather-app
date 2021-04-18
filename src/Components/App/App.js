import { useState } from "react";
import './App.css';
import { SearchBar } from "../SearchBar/SearchBar";
import { DisplayCurrentWeather } from "../DisplayWeather/DisplayCurrentWeather";
import { DisplayHourlyWeather } from "../DisplayWeather/DisplayHourlyWeather";

const weatherUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = "62ebb02f66f4c684e38253b126fa394c";
const geoUrl = "https://geocode.xyz/?locate=";
const geoPrams = "&geoit=JSON";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = ({target}) => {
      setSearchTerm(target.value);
  }

  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);


  const sendApiRequest = () => {
    const geoEndPoint = geoUrl + searchTerm + geoPrams;
    fetch(geoEndPoint).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Request failed!");
    }, (networkError) => {
      console.log(networkError.message);
    }).then(jsonResponse => {
      const weatherEndpoint = weatherUrl + "onecall?lat=" + jsonResponse.latt + "&lon=" + jsonResponse.longt + "&exclude=minutely,alerts&appid=" + apiKey + "&units=metric";
      console.log(weatherEndpoint);
      return fetch(weatherEndpoint);
    }).then(response => {
      return response.json();
    }).then (jsonResponse => {
      console.log(jsonResponse);
      setCurrentWeather(jsonResponse.current);
      console.log(currentWeather);
      setHourlyWeather(jsonResponse.hourly);
      console.log(hourlyWeather);
    })

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
      <DisplayCurrentWeather
        currentWeather={currentWeather}
      />
      <DisplayHourlyWeather
        hourlyWeather={hourlyWeather}
      />
    </main>  
  )
}

export default App;
