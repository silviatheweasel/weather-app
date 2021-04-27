const geoUrl = "https://maps.googleapis.com/maps/api/geocode/json?";
const geoApiKey = "AIzaSyBZrejx_2seANji9k--cgRvzep2KIfJrrw";


export const getGeoInfo = (searchTerm) => {
  const geoEndPoint = geoUrl + "address=" + searchTerm + "&key=" + geoApiKey;
  return fetch(geoEndPoint).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Oops, something went wrong!");
    }, networkError => {
        console.log(networkError.message)
    }).then(jsonResponse => {
      const latitude = jsonResponse.results[0].geometry.location.lat;
      const longitude = jsonResponse.results[0].geometry.location.lng;
      const location = jsonResponse.results[0].formatted_address;
      return {
              latitude: latitude, 
              longitude: longitude, 
              location: location
              };
  })
}
    
export const getCityName = (lat, lnt) => {
  const endPoint = `${geoUrl}latlng=${lat},${lnt}&key=${geoApiKey}&rresult_type=formatted_address`;
  return fetch(endPoint).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Oops, something went wrong!");
  }, (networkError) => {
    console.log(networkError.message);
  }).then(jsonResponse => {
    return jsonResponse.results[0].address_components[2].long_name;
  })
}
    