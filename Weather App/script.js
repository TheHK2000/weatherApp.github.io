const weatherApi = {
  key: "24de506b33d9348924509b658902e221",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

const searchInputBox = document.getElementById("input-box");

// Function for Keypress
searchInputBox.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    document.querySelector(".weather-body").style.display = "block";
  }
});

// Getting Weather Report
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherData);
}

// Show Weather Report
function showWeatherData(weather) {
  console.log(weather);

  let cities = document.getElementById("city");
  cities.innerText = `${weather.name}, ${weather.sys.country}`;
  let temperature = document.getElementById("temp");
  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
  let minMaxTemp = document.getElementById("min-max");
  minMaxTemp.innerHTML = `${Math.round(
    weather.main.temp_min
  )}&deg;C Min / ${Math.round(weather.main.temp_max)}&deg;C Max`;

  let weatherType = document.getElementById("weather");
  weatherType.innerHTML = `${weather.weather[0].main}`;

  let date = document.getElementById("date");
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);

  let video = document.getElementById("myVideo");

  //   Images

  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url('images/clear.jpg')";
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('images/cloud.jpg')";
  } else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url('images/cloud.jpg')";
  } else if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url('images/rain.jpg')";
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage = "url('images/snow.jpg')";
  } else if (weatherType.textContent == "Thunderstorm") {
    document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
  }
}

// Manage Date
function dateManage(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  );

  let day = days[currentDate.getDay()];
  let year = currentDate.getFullYear();
  let month = months[currentDate.getMonth()];
  let date = currentDate.getDate();

  return `${date} ${month} (${day}), ${year}`;
}
