let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let timeHour = now.getHours();
if (timeHour < 10) {
  timeHour = `0${timeHour}`;
}

let timeMinutes = now.getMinutes();
if (timeMinutes < 10) {
  timeMinutes = `0${timeMinutes}`;
}

let time = `${timeHour}:${timeMinutes}`;

let dateElement = document.querySelector("#day-time");
dateElement.innerHTML = `${day} ${time}`;

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/hr`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
}

function showCity(city) {
  let apiKey = "65fd005a167c3443ee0afdb2934af0f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name").value;
  showCity(city);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", citySubmit);

function fetchCurrentLocationWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "65fd005a167c3443ee0afdb2934af0f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleCurrentLocationError(error) {
  console.log("Error occurred while retrieving current location:", error);
}

function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      fetchCurrentLocationWeather,
      handleCurrentLocationError
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

getCurrentLocationWeather();

function changetoFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = 62 + " °F";
}

function changetoCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = 17 + " °C";
}

let unitF = document.querySelector("#farenheit");
unitF.addEventListener("click", changetoFarenheit);

let unitC = document.querySelector("#celsius");
unitC.addEventListener("click", changetoCelsius);
