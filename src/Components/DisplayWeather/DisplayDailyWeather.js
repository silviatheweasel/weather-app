export const DisplayDailyWeather = ({ dailyWeather }) => {
    if (dailyWeather) {
        const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
        return (
            <ul id="daily-content">
                {dailyWeather.map(daily => {
                    const { dt, temp, weather } = daily;
                    const { min, max } = temp;
                    const { icon } = weather[0];
                    const myDay = new Date(dt*1000).getDate() === new Date().getDate() ? "Today" : daysOfTheWeek[new Date(dt*1000).getDay()];
                    const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

                    return (<li key={dt}>
                        <span>{myDay}</span>
                        <img src={iconUrl} alt="weather icon"></img>
                        <span>{min}°/{max}°</span>
                    </li>)
                })}

            </ul>
        )
    }
    return (<div></div>)
}