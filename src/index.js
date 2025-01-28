import "./styles/style.css";
import { fetchWeather } from "./js/weatherFetcher";
import { MainWeatherUpdater } from "./js/Updatemain.js";
import { weatherDataExtractor } from "./js/weatherDataExtractor.js";
import { HourlyWeatherUpdater } from "./js/Updatehourly.js";
import { HighlightUpdater } from "./js/Updatehighlights.js";
import { UpdateOtherCities } from "./js/Updateothercities.js";

async function updateWeatherDisplay(city) {
  try {
    const weatherData = await fetchWeather(city);
    const extractor = new weatherDataExtractor(weatherData);
    const mainUpdater = new MainWeatherUpdater();
    const hourlyUpdater = new HourlyWeatherUpdater();
    const highlightUpdater = new HighlightUpdater();
    const otherCitiesUpdater = new UpdateOtherCities();
    hourlyUpdater.updateHourlyWeather(extractor.hourlyTemp);
    hourlyUpdater.updateTommorowWeather(
      extractor.tomorrow_temp,
      extractor.tomorrow_weather
    );
    highlightUpdater.updateHighlights(
      extractor.wind_kph,
      extractor.uv_index,
      extractor.humidity,
      extractor.rain_chance
    );
    await otherCitiesUpdater.updateOtherCities();
    await mainUpdater.updateMain(
      extractor.temp_c,
      extractor.condition,
      extractor.maxtemp_c,
      extractor.mintemp_c,
      weatherData.location.name,
      weatherData.location.country,
      extractor.localtime,
      extractor.Is_day,
      weatherData.current.feelslike_c
    );
  } catch (error) {
    console.error("Error updating weather display:", error);
  }
}

// Add search functionality
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      try {
        await updateWeatherDisplay(searchTerm);
        searchInput.value = ""; // Clear the input after successful search
      } catch (error) {
        console.error("Search failed:", error);
      }
    }
  }
});

// Initial load with default city
updateWeatherDisplay("Cairo");
