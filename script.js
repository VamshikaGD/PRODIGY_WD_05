const apikey = "YOUR_API_KEY_HERE";

const weatherIcons = {
    "01d": "ri-sun-line",
    "01n": "ri-moon-line",
    "02d": "ri-cloud-line",
    "02n": "ri-cloud-line",
    "03d": "ri-cloudy-line",
    "03n": "ri-cloudy-line",
    "04d": "ri-cloud-windy-line",
    "04n": "ri-cloud-windy-line",
    "09d": "ri-drizzle-line",
    "09n": "ri-drizzle-line",
    "10d": "ri-rainy-line",
    "10n": "ri-rainy-line",
    "11d": "ri-thunderstorms-line",
    "11n": "ri-thunderstorms-line",
    "13d": "ri-snowy-line",
    "13n": "ri-snowy-line",
    "50d": "ri-foggy-line",
    "50n": "ri-foggy-line"
};

// Convert Kelvin to Celsius
function convertToCelsius(kelvin) {
    return Math.floor(kelvin - 273.15);
}

// Auto detect user location
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lon = position.coords.longitude;
                let lat = position.coords.latitude;
                const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
                
                fetch(url)
                    .then((res) => res.json())
                    .then((data) => weatherReport(data))
                    .catch((err) => console.error("Location fetch error:", err));
            },
            (error) => {
                console.warn("⚠️ Location failed:", error.message);
                // Fallback to Mangalore
                const fallbackCity = "Mangalore";
                const fallbackUrl = `http://api.openweathermap.org/data/2.5/weather?q=${fallbackCity}&appid=${apikey}`;

                fetch(fallbackUrl)
                    .then((res) => res.json())
                    .then((data) => weatherReport(data))
                    .catch((err) => console.error("Fallback fetch error:", err));
            }
        );
    }
});


// Search by city
function searchByCity() {
    const place = document.getElementById("input").value.trim();
    if (!place) return;

    const urlsearch = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}`;

    fetch(urlsearch)
        .then((res) => {
            if (!res.ok) {
                throw new Error("City not found");
            }
            return res.json();
        })
        .then((data) => {
            weatherReport(data);
        })
        .catch((err) => {
            alert("⚠️ " + err.message);
        });

    document.getElementById("input").value = '';
}

function getWeatherTip(description) {
    const desc = description.toLowerCase();

    if (desc.includes("rain")) 
        return `<i class="ri-umbrella-line"></i> Rainy vibes! Grab your umbrella and maybe your favorite playlist.`;

    else if (desc.includes("clear")) 
        return `<i class="ri-sun-line"></i> It’s bright and sunny! Don’t forget sunscreen and shades.`;

    else if (desc.includes("storm")) 
        return `<i class="ri-thunderstorms-line"></i> Storm’s brewing! Stay safe and maybe light a cozy candle indoors.`;

    else if (desc.includes("snow")) 
        return `<i class="ri-snowy-line"></i> It’s snowing! Time for some cocoa and fuzzy socks.`;

    else if (desc.includes("mist") || desc.includes("fog")) 
        return `<i class="ri-foggy-line"></i> Fog alert! Go slow, drive safe, and maybe bring a flashlight.`;

    else if (desc.includes("cloud")) 
        return `<i class="ri-cloudy-line"></i> Clouds are rolling in! Sounds like a warm mug and lazy mood kind of day.`;

    return `<i class="ri-sun-cloudy-line"></i> Skies may change, but your vibe is the real forecast. Shine on!`;
}


// Main weather data + forecast
function weatherReport(data) {
    console.log("Fetched weather for:", data.name); 
    const urlcast = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apikey}`;

    fetch(urlcast)
        .then((res) => res.json())
        .then((forecast) => {
            hourForecast(forecast);
            dayForecast(forecast);

            // Current Weather
            document.getElementById("city").innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").innerText = `${convertToCelsius(data.main.temp)} °C`;

            const description = data.weather[0].description;
            document.getElementById("clouds").innerText = description;
            console.log("Description:", description);
            console.log("Weather Tip:", getWeatherTip(description));
            document.getElementById("weather-tip").innerHTML = getWeatherTip(description);


            // Weather icon
            const iconCode = data.weather[0].icon;
            const iconClass = weatherIcons[iconCode] || "ri-cloud-line";
            document.getElementById("weather-icon").className = `${iconClass} ri-4x`;

            // Additional weather details
            document.getElementById("humidity").innerText = `${data.main.humidity}%`;
            document.getElementById("cloudiness").innerText = `${data.clouds.all}%`;
            document.getElementById("wind").innerText = `${data.wind.speed} m/s`;
            
            document.getElementById("pressure").innerText = `${data.main.pressure} hPa`;
            const sunset = new Date(data.sys.sunset * 1000);
            const sunrise = new Date(data.sys.sunrise * 1000);

            document.getElementById("sunset").innerText = sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById("sunrise").innerText = sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

           const { lat, lon } = data.coord;
           const uviURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apikey}`;

           fetch(uviURL)
            .then(res => res.json())
            .then(uviData => {
            const uv = uviData.value;
            document.getElementById("uv").innerText = uv;
           })
           .catch(err => {
                console.warn("UV fetch failed:", err);
            });


        })
        .catch((err) => console.error("Forecast error:", err));
}

// Hourly Forecast
function hourForecast(forecast) {
    const container = document.querySelector('.templist');
    container.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const item = forecast.list[i];
        const date = new Date(item.dt * 1000);
        const timeStr = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

        const hourCard = document.createElement('div');
        hourCard.classList.add('next');

        const details = document.createElement('div');

        const time = document.createElement('p');
        time.classList.add('time');
        time.textContent = timeStr;

        const temp = document.createElement('p');
        temp.textContent = `${convertToCelsius(item.main.temp_max)} °C / ${convertToCelsius(item.main.temp_min)} °C`;

        const icon = document.createElement('i');
        icon.className = `${weatherIcons[item.weather[0].icon] || "ri-cloud-line"} ri-2x`;

        details.appendChild(time);
        details.appendChild(temp);
        details.appendChild(icon);

        const desc = document.createElement('p');
        desc.classList.add('desc');
        desc.textContent = item.weather[0].description;

        hourCard.appendChild(details);
        hourCard.appendChild(desc);
        hourCard.addEventListener('click', () => {
        hourCard.classList.toggle('enlarged');
        });
        container.appendChild(hourCard);
    }
}

// Daily Forecast
function dayForecast(forecast) {
    const container = document.querySelector('.weekF');
    container.innerHTML = '';

    for (let i = 8; i < forecast.list.length; i += 8) {
        const item = forecast.list[i];
        const date = new Date(item.dt * 1000);

        const dayCard = document.createElement('div');
        dayCard.classList.add('dayF');

        // Date
        const dateEl = document.createElement('p');
        dateEl.classList.add('date');
        const dayName = date.toLocaleDateString(undefined, { weekday: 'long' });
        const fullDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
        dateEl.innerHTML = `${dayName}<br>${fullDate}`;


        // Icon
        const iconCode = item.weather[0].icon;
        const iconClass = weatherIcons[iconCode] || "ri-cloud-line";
        const icon = document.createElement('i');
        icon.className = `${iconClass} ri-3x`;
        icon.style.margin = "10px 0";

        // Temp
        const temp = document.createElement('p');
        temp.textContent = `${convertToCelsius(item.main.temp_max)} °C / ${convertToCelsius(item.main.temp_min)} °C`;

        // Description
        const desc = document.createElement('p');
        desc.classList.add('desc');
        desc.textContent = item.weather[0].description;

        // Append all to card
        dayCard.appendChild(dateEl);
        dayCard.appendChild(icon);
        dayCard.appendChild(temp);
        dayCard.appendChild(desc);
        dayCard.addEventListener('click', () => {
        dayCard.classList.toggle('enlarged');
        });
        container.appendChild(dayCard);
    }

}
