function weatherInfo(response){
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityNameElement = document.querySelector("#city-name");
    let conditionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time")
    let date = new Date(response.data.time * 1000);


    cityNameElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    conditionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date);
}

function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10){
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
};


function cityName(city){
   let apiKey = "cf2a3b53726tfaddf4o0d7a1400a5b31";
   let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
   // console.log(apiUrl);
   axios.get(apiUrl).then(weatherInfo);
}

function searchCity(event){
    event.preventDefault();
    let newCity = document.querySelector("#new-city");
  
    cityName(newCity.value);
}
let searchFormElement = document.querySelector("#search-form");
// console.log(searchFormElement);
searchFormElement.addEventListener("submit", searchCity);




