export const DisplayHourlyWeather = ({ hourlyWeather, timezone }) => { 
    if (hourlyWeather) {
        const oneDayHourly = hourlyWeather.slice(0,24);
        return (
            <div id="hourly-forecast">
                <h2>Hourly Forecast</h2>
                <ul className="hourly-list">
                        {oneDayHourly.map((data) => {
                            const myDateTime = new Date(data.dt*1000).toLocaleString('en-GB', { timeZone: timezone });
                            const myTime = myDateTime.substring(myDateTime.length-8, myDateTime.length-3);
                            const iconUrl = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

                            return (                       
                                <li key={data.dt}>
                                    <p className="small">{myTime}</p>
                                    <img 
                                        src={iconUrl}
                                        alt="weather icon"
                                    > 
                                    </img>
                                    <p className="temp">{Math.round(data.temp)}°</p>
                                    <p className="small">{data.weather[0].description}</p>
                                </li>
                            )}                   
                        )}
                </ul>
            </div>
        )             
    }
    return (
        <div></div>
    )   
}
