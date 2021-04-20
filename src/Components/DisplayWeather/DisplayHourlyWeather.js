export const DisplayHourlyWeather = ({ hourlyWeather, timezone }) => { 
    if (hourlyWeather) {

        return (
            <ul className="hourly-content">
                    {hourlyWeather.map((data) => {
                         const myDateTime = new Date(data.dt*1000).toLocaleString('en-GB', { timeZone: timezone });
                         const myTime = myDateTime.substring(myDateTime.length-8, myDateTime.length-3);
                         const iconUrl = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

                        return (                       
                            <li key={data.dt}>
                               <img 
                                    src={iconUrl}
                                    alt="weather icon"
                               > 
                               </img>
                                <p>{myTime}</p>
                                <p>{data.weather[0].description}</p>
                                <p>{data.temp}°</p>
                            </li>
                        )}                   
                    )}
            </ul>
        )             
    }
    return (
        <div></div>
    )   
}
