const apiKey = "0d28f1adb5065ab6858bbddc16ed39b9";
const weather = document.querySelector(".js-weather"),
  content = weather.querySelector(".js-content"),
  place = weather.querySelector(".js-place");
const COORDS_LS = 'coords';

let lat = '';
let lon = '';

loadedCoords = () => {
  const coords = localStorage.getItem(COORDS_LS);
  if(!coords) {
    getLocation();
  } else {
    updateWeather(JSON.parse(coords));
  }
}

getLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const coordsObj = {
      lat : position.coords.latitude,
      lon : position.coords.longitude  
    }
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
    updateWeather(coordsObj);
  }, (error) => {
    console.log(error);
  });
  
}

updateWeather = (coordsObj) => {
  const lat = coordsObj.lat;
  const lon = coordsObj.lon;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  )
  .then(response => {
    return response.json()
  })
  .then(json => {
    const temperature = json.main.temp;
    const placeName = json.name;
    const icon = json.weather[0].icon;
    let dataIcon = "B";
    switch(icon) {
      case "01d": dataIcon = "B"; break;
      case "01n": dataIcon = "C"; break;
      case "02d": dataIcon = "H"; break;
      case "02n": dataIcon = "I"; break;
      case "03d":
      case "03n": dataIcon = "N"; break;
      case "04d":
      case "04n": dataIcon = "Y"; break;
      case "09d": 
      case "09n": 
      case "10d": 
      case "10n": dataIcon = "R"; break;
      case "11d":
      case "11n": dataIcon = "O"; break;
      case "13d":
      case "13n": dataIcon = "W"; break;
      case "50d":
      case "50n": dataIcon = "M"; break;
    }
    const spanIcon = document.createElement('span');
    const spanTemperature = document.createElement('span');
    spanIcon.setAttribute("data-icon", dataIcon);
    spanTemperature.append(`${temperature}°`);
    content.appendChild(spanIcon);
    content.appendChild(spanTemperature);
    place.append(placeName);
  })
}

function init(){
  loadedCoords();
}
init();