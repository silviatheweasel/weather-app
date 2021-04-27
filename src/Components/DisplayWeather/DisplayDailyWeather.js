export const DisplayDailyWeather = ({ dailyWeather }) => {
    if (dailyWeather) {
        const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
        return (
            <div id="daily-forecast">
                <h2>Daily Forecast</h2>
                <ul className="daily-list">
                    {dailyWeather.map(daily => {
                        const { dt, temp, weather } = daily;
                        const { min, max } = temp;
                        const { icon } = weather[0];
                        const myDay = new Date(dt*1000).getDate() === new Date().getDate() ? "Today" : daysOfTheWeek[new Date(dt*1000).getDay()];
                        const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

                        return (<li key={dt}>
                            <span className="myDay">{myDay}</span>
                            <img src={iconUrl} alt="weather icon"></img>
                            <span className="temp">{Math.round(min)}°/{Math.round(max)}°</span>
                        </li>)
                    })}
                </ul>
            </div>
        )
    }
    return (<div></div>)
}