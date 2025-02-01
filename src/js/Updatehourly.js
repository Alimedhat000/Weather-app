import Blizzard from "../assets/icons/Blizzard.svg";
import BlowingSnow from "../assets/icons/Blowing-snow.svg";
import ClearNight from "../assets/icons/Clear-night.svg";
import CloudyClearAtTimesNight from "../assets/icons/Cloudy-clear at times-night.svg";
import CloudyClearAtTimes from "../assets/icons/Cloudy-clear at times.svg";
import Cloudy from "../assets/icons/Cloudy.svg";
import Drizzle from "../assets/icons/Drizzle.svg";
import DrizzleNight from "../assets/icons/Drizzle-night.svg";
import DrizzleAndSun from "../assets/icons/Drizzle&Sun.svg";
import Fog from "../assets/icons/Fog.svg";
import Hail from "../assets/icons/Hail.svg";
import HeavyRain from "../assets/icons/Heavy-rain.svg";
import Humidity from "../assets/icons/Humidity.svg";
import PartlyCloudyNight from "../assets/icons/Partly-cloudy-night.svg";
import PartlyCloudy from "../assets/icons/Partly-cloudy.svg";
import RainNight from "../assets/icons/Rain-night.svg";
import Rain from "../assets/icons/Rain.svg";
import RainAndSun from "../assets/icons/Rain&Sun.svg";
import RainAndThunderstorm from "../assets/icons/Rain&Thunderstorm.svg";
import ScatteredShowersNight from "../assets/icons/Scatterad-showers-night.svg";
import ScatteredShowers from "../assets/icons/Scatterad-showers.svg";
import ScatteredThunderstorm from "../assets/icons/Scatterad-thunderstorm.svg";
import SeverThunderstorm from "../assets/icons/Sever-thunderstorm.svg";
import Sleet from "../assets/icons/Sleet.svg";
import Snow from "../assets/icons/Snow.svg";
import Sunny from "../assets/icons/Sunny.svg";
import Wind from "../assets/icons/Wind.svg";

export class HourlyWeatherUpdater {
  constructor() {
    this.hourWeatherContainer = document.querySelector(
      ".hour-weather-container"
    );
    this.conditionsMap = [
      {
        condition: ["Sunny"],
        icon: Sunny,
      },
      {
        condition: ["Clear", "Clear"],
        day: Sunny,
        night: ClearNight,
      },
      {
        condition: ["Partly cloudy", "Partly Cloudy"],
        day: PartlyCloudy,
        night: PartlyCloudyNight,
      },
      {
        condition: ["Cloudy", "Overcast"],
        icon: Cloudy,
      },
      {
        condition: ["Cloudy-clear at times"],
        day: CloudyClearAtTimes,
        night: CloudyClearAtTimesNight,
      },
      {
        condition: ["Mist", "Fog"],
        icon: Fog,
      },
      {
        condition: ["Freezing fog"],
        icon: Fog,
      },
      {
        condition: ["Patchy light drizzle"],
        day: DrizzleAndSun,
        night: DrizzleNight,
      },
      {
        condition: [
          "Light drizzle",
          "Freezing drizzle",
          "Heavy freezing drizzle",
        ],
        day: Drizzle,
        night: DrizzleNight,
      },
      {
        condition: ["Patchy rain possible", "Patchy rain nearby"],
        day: RainAndSun,
        night: RainNight,
      },
      {
        condition: [
          "Light rain",
          "Moderate rain at times",
          "Moderate rain",
          "Light freezing rain",
          "Moderate or heavy freezing rain",
        ],
        day: Rain,
        night: RainNight,
      },
      {
        condition: ["Heavy rain at times", "Heavy rain"],
        icon: HeavyRain,
      },
      {
        condition: ["Light rain shower"],
        day: ScatteredShowers,
        night: ScatteredShowersNight,
      },
      {
        condition: ["Moderate or heavy rain shower", "Torrential rain shower"],
        day: ScatteredShowers,
        night: ScatteredShowersNight,
      },
      {
        condition: ["Thundery outbreaks possible"],
        icon: ScatteredThunderstorm,
      },
      {
        condition: ["Patchy light rain with thunder"],
        icon: RainAndThunderstorm,
      },
      {
        condition: ["Moderate or heavy rain with thunder"],
        icon: SeverThunderstorm,
      },
      {
        condition: [
          "Patchy snow possible",
          "Light snow",
          "Patchy moderate snow",
          "Moderate snow",
          "Light snow showers",
          "Moderate or heavy snow showers",
        ],
        icon: Snow,
      },
      {
        condition: ["Patchy heavy snow", "Heavy snow"],
        icon: BlowingSnow,
      },
      {
        condition: [
          "Patchy sleet possible",
          "Light sleet",
          "Moderate or heavy sleet",
          "Light sleet showers",
          "Moderate or heavy sleet showers",
        ],
        icon: Sleet,
      },
      {
        condition: [
          "Ice pellets",
          "Light showers of ice pellets",
          "Moderate or heavy showers of ice pellets",
        ],
        icon: Hail,
      },
      {
        condition: ["Blowing snow"],
        icon: BlowingSnow,
      },
      {
        condition: ["Blizzard"],
        icon: Blizzard,
      },
      {
        condition: [
          "Patchy light snow with thunder",
          "Moderate or heavy snow with thunder",
        ],
        icon: SeverThunderstorm,
      },
    ];
  }
  updateHourlyWeather(data) {
    if (!data || !Array.isArray(data)) {
      console.error("Invalid data received:", data);
      return;
    }

    this.hourWeatherContainer.innerHTML = "";

    data.forEach((hour) => {
      const isDay = hour.is_day === 1;
      const formattedConditionText = hour.condition
        .trim()
        .toLowerCase()
        .replace(/^./, (str) => str.toUpperCase());
      const condition = this.conditionsMap.find((condition) =>
        condition.condition.includes(formattedConditionText)
      );

      let icon;
      if (condition) {
        if (condition.icon) {
          icon = condition.icon;
        } else if (condition.day && condition.night) {
          icon = isDay ? condition.day : condition.night;
        } else {
          console.warn(
            `No icon mapping found for condition: ${hour.condition}`
          );
          icon = isDay ? Sunny : ClearNight;
        }
      } else {
        console.warn(`Unknown condition: ${hour.condition}`);
        icon = isDay ? Sunny : ClearNight;
      }

      const temp = Math.round(hour.temp);
      const timeString =
        hour.time === 0
          ? "12AM"
          : hour.time === 12
          ? "12PM"
          : hour.time > 12
          ? `${hour.time - 12}PM`
          : `${hour.time}AM`;

      const div = document.createElement("div");
      div.className = "hour-weather";
      div.innerHTML = `
        <span class="hour">${timeString}</span>
        <div class="hour-icon">
          <img src="${icon}" alt="${hour.condition}">
        </div>
        <span class="hour-temperature">${temp}°</span>
      `;

      this.hourWeatherContainer.appendChild(div);
    });
  }
  updateTommorowWeather(temp_c, condition) {
    const tomorrowWeather = document.querySelector(".tomorrow-overview");

    const formattedCondition = condition
      .trim()
      .toLowerCase()
      .replace(/^./, (str) => str.toUpperCase());
    const conditionMapping = this.conditionsMap.find((c) =>
      c.condition.includes(formattedCondition)
    );

    let icon;
    if (conditionMapping) {
      icon = conditionMapping.icon || conditionMapping.day || Sunny;
    } else {
      console.warn(`Unknown condition: ${condition}`);
      icon = Sunny;
    }
    tomorrowWeather.innerHTML = `
                <div class="tomorrow-weather">
                    <span>Tomorrow</span>
                    <span>${condition}</span>
                </div>
                <span id="tomorrow-temp">${Math.round(temp_c)}°C</span>
                <img src="${icon}" id="tomorrow-icon" alt="${condition}">`;
  }
}
