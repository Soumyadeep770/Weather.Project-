const apiKey = 'bb856004c31d281fcc6e4760d416d64a'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('current-location-btn');
const cityInput = document.getElementById('city-input');
const forecastContainer = document.getElementById('forecast-container');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeatherByCity(city);
    }
});

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoordinates(lat, lon);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function fetchWeatherByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayForecast(data));
}

function fetchWeatherByCoordinates(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayForecast(data));
}

function displayForecast(data) {
    forecastContainer.innerHTML = ''; // Clear any previous forecast
    for (let i = 0; i < data.list.length; i += 8) { // Getting daily data (every 24 hours)
        const dayData = data.list[i];
        const date = new Date(dayData.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(dayData.main.temp);
        const iconCode = dayData.weather[0].icon;
        
        // Creating a div for each day
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        
        dayDiv.innerHTML = `
            <p>${dayName}</p>
            <img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${dayData.weather[0].description}">
            <p>${temp}°C</p>
        `;
        
        forecastContainer.appendChild(dayDiv);
    }
}
document.getElementById("search-btn").addEventListener("click", function() {
    const container = document.querySelector(".container");
  
    // Remove and re-add the 'animate' class to restart the animation
    container.classList.remove("animate");
    void container.offsetWidth; // Trigger reflow to restart animation
    container.classList.add("animate");
  });
  const searchResults = document.getElementById('search-results');

function openSearch() {
  searchResults.classList.add('fullscreen');
}

function closeSearch() {
  searchResults.classList.remove('fullscreen');
}

  