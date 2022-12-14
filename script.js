const api = {
    key: "28fd15358cdecbc1a1dfef367e71acef",
    base: "https://api.openweathermap.org/data/2.5/"
}

const search =document.querySelector('.search');
const btn =document.querySelector('.btn');
const images = document.querySelector('.main-container');
btn.addEventListener('click',getInput);

function getInput(event){
    event.preventDefault();
    if(event.type == "click"){
        getData(search.value);
        console.log(search.value);
    }
}

function getData(){
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then(response => {
        return response.json();
    }).then(displayData);
  
}

function displayData(response){
    console.log(response);
    const error = document.querySelector('.error')
    if(response.cod === '404'){
        error.textContent = "Please enter a valid city";
        search.value = "";
    }else{
        error.innerHTML = "";
        const city = document.querySelector('.city');
        city.innerText = `${response.name},${response.sys.country}`;
        const today = new Date();
        const date = document.querySelector('.date');
        date.innerText = dateFunction(today);
        
        const temp = document.querySelector('.temp');
        temp.innerHTML=`Temp: ${Math.round(response.main.temp)}<span>°C</span>`
    }
    const weather = document.querySelector('.weather');
    weather.innerText = `Weather: ${response.weather[0].main}`;

    const tempRange = document.querySelector('.temp-range');
    tempRange.innerText = `TempRange: ${(response.main.temp_min)}°C / ${(response.main.temp_max)}°C `

    const weatherIcon = document.querySelector('.weather-icon');
    const iconURL = "http://openweathermap.org/img/w/";
    weatherIcon.src = iconURL + response.weather[0].icon +".png";

    if(response.weather[0].main=='Mist'){
        images.style.background = 'url(./images/day/misty.jpg)'
    }
    if(response.weather[0].main=='Clouds'){
        images.style.background = 'url(./images/day/clouds.jpg) no-repeat'
    }
    if(response.weather[0].main=='Rain'){
        images.style.background = 'url(./images/day/rainy-day.jpg) no-repeat'
    }
    if(response.weather[0].main=='Clear'){
        images.style.background = 'url(./images/day/sunny.jpg)'
    }
    if(response.weather[0].main=='Windy'){
        images.style.background = 'url(./images/day/windy.jpg)'
    }
    if(response.weather[0].main=='Haze'){
        images.style.background = 'url(./images/day/misty.jpg)'
    }
    search .value = "";

}

function dateFunction(d){
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day},${date} ${month} ${year}`;

}
