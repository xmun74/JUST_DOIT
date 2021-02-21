const weather = document.querySelector(".js-weather");
const API_KEY = "d892b91002eabd160955c7e8ede6566d";
const COORDS = 'coords'

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    const temperature = json.main.temp;
    const place = json.name;
    // weather.innerText = `${temperature}º ${place}`
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    weather.appendChild(span1);
    weather.appendChild(span2);
    span1.innerText = `${temperature}℃`;
    span2.innerText = `${place}`;
  })

}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}

function askforCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords() {
  const loadedCoord = localStorage.getItem(COORDS);
  if(loadedCoord === null) {
    askforCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoord);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();