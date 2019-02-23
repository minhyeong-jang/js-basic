const apiKey = "0d28f1adb5065ab6858bbddc16ed39b9";
const weather = document.querySelector(".js-weather");
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
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
  })
}

function init(){
  loadedCoords();
}
init();