export const DisplayCurrentWeather = ({currentWeather}) => {
    if (currentWeather) {
        const { name, dt, sys, weather, main } = currentWeather;
        const { temp, feels_like } = main;

        const myDateTime = new Date(dt*1000).toLocaleString('en-GB', { timeZone: 'UTC' });
        const myDate = myDateTime.substring(0, 5);
        const myTime = myDateTime.substring(myDateTime.length-8, myDateTime.length-3);

        return (
            <div id="weather-display">
                <p>Updated {myDate}, {myTime}</p>
                <p><i className="fas fa-map-marker-alt"></i> {name}, {sys.country}</p>
                <p>{weather[0].description}</p>
                <p>{Math.round(temp)}°C</p>
                <p>Feels like {Math.round(feels_like)}°C</p>
            </div>
        )
    }

    return (
        <div></div>
    )
    
};