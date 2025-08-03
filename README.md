# PRODIGY_WD_05
# Weather App - Responsive Weather Application

Weather App is a responsive weather web application built as part of the Web Development Internship at Prodigy InfoTech. This project corresponds to **Task 05 (PRODIGY_WD_05)** and utilizes HTML, CSS, and JavaScript to fetch real-time weather data and render it in a clean, modern interface with animated interactions and personalized messages.

## Overview

Weather App allows users to search for current weather conditions and forecasts by city or automatically detect their location using the Geolocation API. The app provides detailed weather insights including temperature, condition, hourly forecast, upcoming days, and today’s highlights like UV index, humidity, wind speed, and more. It also includes dynamic suggestions based on the weather.

## Live Demo

View the project live:  
https://vamshikagd.github.io/PRODIGY_WD_05/

## Features

### Auto Location & Search
- Automatically detects the user's location on load and fetches local weather data
- Manual city search with input field and search button

### Current Weather Display
- Displays current city, country, weather icon, temperature, and condition
- Animated reveal and transitions for a modern UX

### Weather Vibe Message
- Generates a custom message/tip based on current weather (e.g., rainy day = umbrella tip)
- Weather icons embedded using Remix Icons

### Hourly Forecast
- Clean, scrollable layout of upcoming hourly forecasts
- Displays time, temperature range, weather icon, and brief description

### 4-Day Forecast
- Highlights weather for the next 4 days
- Includes date, weather icon, high/low temperatures, and condition

### Today's Highlights
- Inline cards for:
  - UV Index
  - Humidity
  - Cloudiness
  - Wind Speed
  - Pressure
  - Sunrise & Sunset Times
- All metrics are styled with individual background blocks inside the main weather card

### Visual Design
- Dark glassmorphism background with white translucent cards
- Clean font styling using Google Fonts
- Weather icons via Remix Icon CDN
- Smooth card hover effects and transitions
- Subtle animations for temperature and data reveal

## Technologies Used

- **HTML5** – Semantic structure and layout  
- **CSS3** – Styling, layout, card design, hover effects  
- **JavaScript (Vanilla)** – API fetching, DOM manipulation, geolocation  
- **OpenWeatherMap API** – Real-time weather and forecast data  
- **Remix Icons** – Weather icons and card embellishments  
- **Google Fonts** – Custom font integration

## Responsiveness

While optimized primarily for desktop viewports, the layout gracefully adapts to various screen widths with partial responsiveness. Mobile optimizations can be added further for enhanced support.

## Project Structure

PRODIGY_WD_05/  
├── index.html  
├── style.css  
├── script.js  
├── README.md

## Internship Context

- **Program**: Web Development Internship  
- **Organization**: Prodigy InfoTech  
- **Task ID**: PRODIGY_WD_05
- **Duration**: 1 Month  
- **Domain**: Web Development

## Note on API Key

This project uses the **OpenWeatherMap API** to retrieve real-time weather data.  
To run the project locally or deploy it yourself, you need to:

1. Create a free account at [https://openweathermap.org](https://openweathermap.org)  
2. Generate an API key from your dashboard  
3. Replace the placeholder in `script.js` with your API key:
   ```javascript
   const apikey = "YOUR_API_KEY_HERE";
   ```

Without this, weather data will not load.

## License

This project was developed as part of an internship learning program. The content is intended for educational and demonstrational purposes only. All third-party assets used (like weather API, icons, and fonts) are subject to their respective licenses.

## Author

**Vamshika G D**  
GitHub: https://github.com/VamshikaGD
LinkedIn: www.linkedin.com/in/vamshika-g-d-ab25492a4
