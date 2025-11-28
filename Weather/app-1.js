// DOM Elements
const cityNameElement = document.getElementById("cityName");
const currentTemp = document.getElementById("currentTemp");
const weatherDesc = document.getElementById("weatherDesc");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const visibility = document.getElementById("visibility");
const cloudCover = document.getElementById("cloudCover");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const hourlyForecastContainer = document.getElementById("hourlyForecast");
const lastUpdate = document.getElementById("lastUpdate");
const errorMessage = document.getElementById("error-message");
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("citySearch");

// Fetch and Display Weather
async function getAndDisplayWeather(city) {
    const apiUrl = `http://weatherapps.infinityfreeapp.com/weather1/connection1.php?city=${encodeURIComponent(city)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log(data);

        if (data.error) throw new Error(data.error);

        localStorage.setItem(city, JSON.stringify(data));

        updateWeatherUI(data.currentWeather);
        updateForecastUI(data.hourlyForecast);
    } catch (error) {
        console.error("Fetch error:", error);
        errorMessage.textContent = "Error fetching data: " + error.message;
        clearWeatherUI();
    }
}

// Update UI
function updateWeatherUI(data) {
    if (!data) return;

    cityNameElement.textContent = `${data.cityName}, ${data.country}`;
    currentTemp.textContent = `${data.temperature}°C`;
    weatherDesc.textContent = data.weatherDesc;
    feelsLike.textContent = `Feels like ${data.feelsLike}°C`;
    pressure.textContent = `${data.pressure} hPa`;
    humidity.textContent = `${data.humidity}%`;
    windSpeed.textContent = `${data.windSpeed} km/h`;
    visibility.textContent = `${data.visibility} km`;
    cloudCover.textContent = `${data.cloudCover}%`;
    sunrise.textContent = formatTime(data.sunRise);
    sunset.textContent = formatTime(data.sunSet);

    lastUpdate.textContent = `Updated on ${formatDateTime(new Date())}`;

    document.querySelector('.weather-icon img').src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
}

// Update Forecast UI
function updateForecastUI(forecast) {
    if (!hourlyForecastContainer) return;

    hourlyForecastContainer.innerHTML = '';
    forecast.forEach(hour => {
        const forecastCard = document.createElement('div');
        forecastCard.className = 'hourly-card';
        forecastCard.innerHTML = `
            <p>${formatTime(hour.time)}</p>
            <img src="https://openweathermap.org/img/wn/${hour.icon}.png" alt="Weather icon">
            <p>${hour.temperature}°C</p>
            <p>${hour.weatherDesc}</p>
        `;
        hourlyForecastContainer.appendChild(forecastCard);
    });
}

// Clear UI on error
function clearWeatherUI() {
    cityNameElement.textContent = "City not found";
    currentTemp.textContent = "N/A";
    weatherDesc.textContent = "N/A";
    feelsLike.textContent = "N/A";
    pressure.textContent = "N/A";
    humidity.textContent = "N/A";
    windSpeed.textContent = "N/A";
    visibility.textContent = "N/A";
    cloudCover.textContent = "N/A";
    sunrise.textContent = "N/A";
    sunset.textContent = "N/A";
    hourlyForecastContainer.innerHTML = '';
}

// Utility Functions
function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDateTime(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });
}

// Event Listeners
searchBtn.addEventListener("click", () => {
    const searchValue = cityInput.value.trim();
    if (searchValue) getAndDisplayWeather(searchValue);
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        getAndDisplayWeather(cityInput.value.trim());
    }
});

// Initial load
getAndDisplayWeather("Demopolis");
