function weatherInfo(response){
    //console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityNameElement = document.querySelector("#city-name");
    let conditionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time")
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    cityNameElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    conditionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;

    getForecast(response.data.city);
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
   let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
   // console.log(apiUrl);
   axios.get(apiUrl).then(weatherInfo);
}

function searchCity(event){
    event.preventDefault();
    let newCity = document.querySelector("#new-city");
    cityName(newCity.value);
}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "cf2a3b53726tfaddf4o0d7a1400a5b31";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
   // console.log(apiUrl);
}

function displayForecast(response) {
    console.log(response.data);

    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
        forecastHtml = 
            forecastHtml +
             `
        <div class="weather-forecast-day">
            <div class="weather-date">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}" class="forecast-icon"/>
            <div class="forecast-temperatures">
                <div class="forecast-temp"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
                <div class="forecast-temp">${Math.round(day.temperature.minimum)}°</div>
             </div>
            </div>
            `;
        }
        });

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;

};

let searchFormElement = document.querySelector("#search-form");
// console.log(searchFormElement);
searchFormElement.addEventListener("submit", searchCity);

//searchCity("Paris");

