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

    

    console.log(response.data);

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
    console.log(apiURL);
    axios.get(apiURL).then(updateWeatherValue);
}

function searchButtonFunctionality(event){
    event.preventDefault();
    let searchInput = document.querySelector("#city");
   
    searchCityData(searchInput.value);
}


let searchFormElement =document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchButtonFunctionality);
searchCityData("Johannesburg");