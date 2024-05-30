function searchCity(event){
    event.preventDefault();
    let newCity = document.querySelector("#new-city");
    //console.log(newCity.value);
    let cityNameElement = document.querySelector("#city-name");
    cityNameElement.innerHTML = newCity.value
}
let searchFormElement = document.querySelector("#search-form");
//console.log(searchFormElement);
searchFormElement.addEventListener("submit", searchCity);
