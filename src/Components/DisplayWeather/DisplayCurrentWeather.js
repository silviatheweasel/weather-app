export const DisplayCurrentWeather = ({currentWeather}) => {
    if (currentWeather) {
        const { dt, weather, feels_like, temp } = currentWeather;
        const { icon, description } = weather[0];

        const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        const myDateTime = new Date(dt*1000).toLocaleString('en-GB', { timeZone: 'UTC' });
        const myDate = myDateTime.substring(0, 5);
        const myTime = myDateTime.substring(myDateTime.length-8, myDateTime.length-3);

        return (
            <div id="weather-display">
                <p>Updated {myDate}, {myTime}</p>
                {/* <p><i className="fas fa-map-marker-alt"></i> {name}, {sys.country}</p> */}
                <img 
                    src={iconUrl}
                    alt="weather icon"
                >
                </img>
                <p>{description}</p>
                <p>{Math.round(temp)}°C</p>
                <p>Feels like {Math.round(feels_like)}°C</p>
            </div>
        )
    }

    return (
        <div></div>
    )
    
};