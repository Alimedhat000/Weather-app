import "./styles/style.css";
import { fetchWeather } from "./js/weatherFetcher";
import { MainWeatherUpdater } from "./js/Updatemain.js";
import { weatherDataExtractor } from "./js/weatherDataExtractor.js";
import { HourlyWeatherUpdater } from "./js/Updatehourly.js";
import { HighlightUpdater } from "./js/Updatehighlights.js";
import { UpdateOtherCities } from "./js/Updateothercities.js";
import {
  fetchCitySuggestions,
  displaySuggestions,
} from "./js/searchSuggestion.js";

const loader = document.querySelector(".loader");
// Add loader control functions
const showLoader = () => (loader.style.display = "flex");
const hideLoader = () => (loader.style.display = "none");

// Hide loader initially
hideLoader();

async function updateWeatherDisplay(city) {
  try {
    showLoader(); // Show loader before fetching
    const weatherData = await fetchWeather(city);
    const extractor = new weatherDataExtractor(weatherData);
    const mainUpdater = new MainWeatherUpdater();
    const hourlyUpdater = new HourlyWeatherUpdater();
    const highlightUpdater = new HighlightUpdater();
    const otherCitiesUpdater = new UpdateOtherCities();

    // Update all components
    await Promise.all([
      hourlyUpdater.updateHourlyWeather(extractor.hourlyTemp),
      hourlyUpdater.updateTommorowWeather(
        extractor.tomorrow_temp,
        extractor.tomorrow_weather
      ),

      highlightUpdater.updateHighlights(
        extractor.wind_kph,
        extractor.uv_index,
        extractor.humidity,
        extractor.rain_chance
      ),
      otherCitiesUpdater.updateOtherCities(),
      mainUpdater.updateMain(
        extractor.temp_c,
        extractor.condition,
        extractor.maxtemp_c,
        extractor.mintemp_c,
        weatherData.location.name,
        weatherData.location.country,
        extractor.localtime,
        extractor.Is_day,
        weatherData.current.feelslike_c
      ),
    ]);
  } catch (error) {
    console.error("Error updating weather display:", error);
  } finally {
    setTimeout(() => {
      hideLoader();
    }, 1000);
    // Hide loader after everything is done
  }
}

// Add search functionality
const searchInput = document.getElementById("search-input");
const searchContainer = document.querySelector(".search");

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

// Add search auto complete
// Create suggestions container
const suggestionsContainer = document.createElement("div");
suggestionsContainer.className = "search-suggestions";
searchContainer.appendChild(suggestionsContainer);

let debounceTimer;

searchInput.addEventListener("input", async (e) => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(async () => {
    const query = e.target.value.trim();
    if (query.length < 2) {
      suggestionsContainer.style.display = "none";
      return;
    }

    const suggestions = await fetchCitySuggestions(query);
    displaySuggestions(
      suggestions,
      suggestionsContainer,
      searchInput,
      updateWeatherDisplay
    );
  }, 300);
});

// Close suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!searchContainer.contains(e.target)) {
    suggestionsContainer.style.display = "none";
  }
});
