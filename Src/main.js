
function formatDate(timestamp){
     let date= new Date (timestamp);
     let hours= date.getHours();
    if (hours<10) {
     hours=`0${hours}`;
 }
 let mintues=date.getMinutes();
 if (mintues <10) {
     mintues=`0${mintues}`; 
 }

 let days =["Monday" ,"Tuesday", "Wednesday" ,"Thurday", "Friday","Saturday" ,"Sunday"];
 let day = days[date.getDay()];
 
 return`${day} ${hours}:${mintues}`;
}
function formatday(timestamp){
    let date = new Date (timestamp *1000);
    let day = date.getDay();
    let days =["Mon", "Tue", "wed", "Thur", "Fri", "Sat", "Sun"];
     return days[day] ;
}

function displayForecast(response){
    
     let forecast = response.data.daily;
     let forecastElement = document.querySelector("#forecast");
     let forecastHTML = `<div class="row">`;
     forecast.forEach(function(forecastday,index) {
         if (index <6){
     forecastHTML= forecastHTML +` <div class="col-2">
                <div class="weather-forcast-date" >
            
                ${formatday(forecastday.dt)}
                </div>
                <img src="http://openweathermap.org/img/wn/${forecastday.weather[0].icon}@2x.png" alt="" class="" width="42"/>
                <div class="weather-forcast-temperature">
                <span class="weather-forcast-temperature-max">${Math.round (forecastday.temp.max)}°</span>
                 <span class="weather-forcast-temperature-min"> ${Math.round(forecastday.temp.min)}°</span>
              
           </div>
              </div>
            
         `;  }
         
        
     });
          forecastHTML=  forecastHTML + `</div>`  
          forecastElement.innerHTML= forecastHTML;
     }
    
         
function  getForecast(coordinates){
    console.log(coordinates);
    let apiKey ="5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl =  `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

function displayweather(response) {
   let temperatureElement = document.querySelector("#temperature");
   let cityElement= document.querySelector("#city");
   let descriptionElement=document.querySelector("#description");
   let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon")
    celsiusTemp = response.data.main.temp;

   temperatureElement.innerHTML= Math.round(celsiusTemp);
   cityElement.innerHTML=response.data.name; 
   descriptionElement.innerHTML=response.data.weather[0].description;
   dateElement.innerHTML=formatDate(response.data.dt *1000);
   iconElement.setAttribute("src" ,`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    getForecast(response.data.coord);
}


function search (city){ 
let apiKey ="5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayweather);
 }

function formSubmit(event) {
    event.preventDefault();
     let cityInputElement = document.querySelector("#city-input");
     search(cityInputElement.value);
   
}

  search("london")
let form = document.querySelector("#search-form");
form.addEventListener("submit", formSubmit);




 