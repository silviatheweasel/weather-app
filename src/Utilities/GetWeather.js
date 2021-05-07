const weatherUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const getWeatherInfo = (longtitude, lattitude) => {
    const weatherEndpoint = weatherUrl + "onecall?lat=" + lattitude + "&lon=" + longtitude + "&exclude=minutely,alerts&appid=" + apiKey + "&units=metric";
    return fetch(weatherEndpoint).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Oops, something went wrong!");
    }, networkError => {
        console.log(networkError.message)
    }).then (jsonResponse => {
        return {
            current: jsonResponse.current,
            hourly: jsonResponse.hourly,
            daily: jsonResponse.daily,
            timezone: jsonResponse.timezone
        };
    });
}     
