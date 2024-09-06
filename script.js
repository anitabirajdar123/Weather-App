const apiKey = '11e5a8ef8e39d419889a891445e566dd'; 
const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        console.log(data); // Log the entire response for debugging

        if (response.status !== 200) {
            throw new Error(data.message || 'Unable to fetch weather data');
        }

        displayWeather(data);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function displayWeather(data) {
    const city = data.name || 'Unknown City';
    const country = data.sys?.country || 'Unknown Country';
    const temp = data.main?.temp !== undefined ? data.main.temp + ' °C' : 'Temperature not available';
    const description = data.weather?.[0]?.description || 'No description available';

    cityName.textContent = `${city}, ${country}`;
    temperature.textContent = `Temperature: ${temp}`;
    weatherDescription.textContent = `Weather: ${description}`;
    weatherResult.style.display = 'block';
}