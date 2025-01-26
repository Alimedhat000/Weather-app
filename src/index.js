import "./styles/style.css";
import { fetchWeather } from "./js/weatherFetcher";
import { MainWeatherUpdater } from "./js/Updatemain.js";
import { weatherDataExtractor } from "./js/weatherDataExtractor.js";

async function updateWeatherDisplay(city) {
  try {
    const weatherData = await fetchWeather(city);
    const extractor = new weatherDataExtractor(weatherData);
    const mainUpdater = new MainWeatherUpdater();

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

// Initial load with default city
updateWeatherDisplay("London");
