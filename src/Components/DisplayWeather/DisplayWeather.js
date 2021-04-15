export const DisplayWeather = ({data}) => {
    if (data) {const myDate = new Date(data.dt*1000);
    console.log(myDate);
    }


    return (
        data && <div id="weather-display">
            <p><i className="fas fa-map-marker-alt"></i> {data.name}, {data.sys.country}</p>
            <p>{data.weather[0].description}</p>
            <p>{data.main.temp}°C</p>
            <p>{data.main.temp_min}°C - {data.main.temp_max}°C</p>
            <p>Feels like {data.main.feels_like}°C</p>
        </div>
    )
};