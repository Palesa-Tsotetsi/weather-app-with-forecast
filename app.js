function updateWeatherValue(response){
    let temperatureElement= document.querySelector("#temperatureValue");
    let temperature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature);

    let cityName= document.querySelector("#chosenCity");
    cityName.innerHTML= response.data.city;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;

    let humidityElement = document.querySelector("#humid");
    humidityElement.innerHTML= `Humidity: ${response.data.temperature.humidity}%`;
    
    let windElement = document.querySelector("#wind");
    windElement.innerHTML= `Wind: ${response.data.wind.speed}km/h`;

    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML= `<img src="${response.data.condition.icon_url}" class ="icon"/>`;

    let date = new Date(response.data.time * 1000);

    let timeElement = document.querySelector("#time");
    timeElement.innerHTML= dateFormat(date);

    getWeatherForecast(response.data.city);

}
function dateFormat(date){
    
    let minutes = date.getMinutes();
    let hours = date.getHours();

    let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day= days[date.getDay()];

    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    
    return `${day} ${hours}:${minutes}`;
}

function searchCityData(city){
    let apiKey = "78b7a4e95c0c3t9a66222f0o3d5f4ee1";
    let apiURL =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    
    axios.get(apiURL).then(updateWeatherValue);
}

function searchButtonFunctionality(event){
    event.preventDefault();
    let searchInput = document.querySelector("#city");
   
    searchCityData(searchInput.value);
}

function getWeatherForecast(city) {
    let apiKey = "78b7a4e95c0c3t9a66222f0o3d5f4ee1";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios(apiUrl).then(displayWeatherForecast);
  }

  function dayFormat(time) {
    let date = new Date(time * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[date.getDay()];
  }
  
function displayWeatherForecast(response) {
    let weatherforecastHtml = "";
  
    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        weatherforecastHtml =
          weatherforecastHtml +
          `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${dayFormat(day.time)}</div>
  
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}&deg</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}&deg</div>
          </div>
        </div>
      `;
      }
    });
  
    let weatherforecastElement = document.querySelector("#weatherForecast");
    weatherforecastElement.innerHTML = weatherforecastHtml;
  }

let searchFormElement =document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchButtonFunctionality);
searchCityData("Johannesburg");

