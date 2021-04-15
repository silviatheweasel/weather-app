import { useState } from "react";
import './App.css';
import { SearchBar } from "../SearchBar/SearchBar";
import { DisplayWeather } from '../DisplayWeather/DisplayWeather';

const url = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "62ebb02f66f4c684e38253b126fa394c";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = ({target}) => {
      setSearchTerm(target.value);
  }

  const [data, setData] = useState(null);
  const sendApiRequest = () => {
    const endpoint = url + "q=" + searchTerm + "&appid=" + apiKey + "&units=metric";
    console.log(endpoint);
    fetch(endpoint, {cache: 'no-cache'}).then(response => {
      if (response.ok) {
        return response.json();
      }
      alert("Invalid request, please enter a valid city.")
    }, networkError => {
      throw new Error ("Request failed!");
    }).then((jsonResponse) => {
      console.log(jsonResponse);
      setData(jsonResponse);
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
      <DisplayWeather
        data={data}
      />
    </main>  
  )
}

export default App;
