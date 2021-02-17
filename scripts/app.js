const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();


const updateUI = (data) => {
    //deconstructing data object
    const { cityDetails, weather } = data;
    //replace details in html
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `
    //update the weather icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    
    //shows day or night background img if weather is day or night
    let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
    time.setAttribute("src", timeSrc);

    // remove the d-none class if present. Shows content when d-none removed
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}

cityForm.addEventListener("submit", e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset(); 

    //gets city details, passes it to updateUI so all city weather within the page can be updated
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(error => console.log(error));

    //set local storage
    localStorage.setItem("city", city);

});

//runs as soon as page is loaded
//automatically loads the most recent city stored in local storage
if(localStorage.getItem("city")){
    console.log("Most recent city found")
    forecast.updateCity(localStorage.getItem("city"))
        .then(data => updateUI(data))
        .catch(error => console.log(error));
}
