import { useState } from "react";
import './App.css';
import { SearchBar } from "../SearchBar/SearchBar";
import { DisplayCurrentWeather } from '../DisplayWeather/DisplayCurrentWeather';

const url = "https://api.openweathermap.org/data/2.5/";
const apiKey = "62ebb02f66f4c684e38253b126fa394c";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = ({target}) => {
      setSearchTerm(target.value);
  }

  const [currentWeather, setCurrentWeather] = useState(null);
  const sendApiRequest = () => {
    const currentWeatherEndpoint = url + "weather?q=" + searchTerm + "&appid=" + apiKey + "&units=metric";
    const forcastWeatherEndpoint = url + "forecast?q=" + searchTerm + "&appid=" + apiKey + "&units=metric" + "&cnt=3";
    console.log(currentWeatherEndpoint);
    fetch(currentWeatherEndpoint).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Request failed!");
    }, networkError => {
      console.log(networkError);
    }).then((jsonResponse) => {
      console.log(jsonResponse);
      setCurrentWeather(jsonResponse);
    });

    fetch(forcastWeatherEndpoint).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Request failed!");
    }, (networkError) => {
      console.log(networkError.message);
    }).then((jsonResponse) => {
      console.log(jsonResponse);
    });

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
      <DisplayCurrentWeather
        currentWeather={currentWeather}
      />
    </main>  
  )
}

export default App;
