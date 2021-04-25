const weatherUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = "62ebb02f66f4c684e38253b126fa394c";

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
