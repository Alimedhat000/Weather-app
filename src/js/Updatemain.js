import DaySun from "../assets/imgs/DaySun.png";
import NightMoon from "../assets/imgs/NightMoon.png";
import DayClouds from "../assets/imgs/DayClouds.png";
import NightClouds from "../assets/imgs/NightClouds.png";
import DayRain from "../assets/imgs/DayRain.png";
import NightRain from "../assets/imgs/NightRain.png";
import DayStorm from "../assets/imgs/DayStorm.png";
import NightStorm from "../assets/imgs/NightStorm.png";
import DaySnow from "../assets/imgs/DaySnow.png";
import NightSnow from "../assets/imgs/NightSnow.png";

export class MainWeatherUpdater {
  constructor() {
    this.main = document.querySelector(".main-weather");
    this.conditionsMap = [
      {
        condition: ["Sunny", "Clear"],
        day: DaySun,
        night: NightMoon,
      },
      {
        condition: ["Partly cloudy", "Partly Cloudy"],
        day: DayClouds,
        night: NightClouds,
      },
      {
        condition: ["Cloudy", "Overcast", "Mist", "Fog"],
        day: DayClouds,
        night: NightClouds,
      },
      {
        condition: [
          "Patchy rain possible",
          "Light rain",
          "Light drizzle",
          "Moderate rain at times",
          "Patchy light drizzle",
          "Light rain shower",
        ],
        day: DayRain,
        night: NightRain,
      },
      {
        condition: [
          "Moderate rain",
          "Heavy rain",
          "Heavy rain at times",
          "Moderate or heavy rain shower",
        ],
        day: DayStorm,
        night: NightStorm,
      },
      {
        condition: [
          "Thundery outbreaks possible",
          "Patchy light rain with thunder",
          "Moderate or heavy rain with thunder",
          "Thunderstorm",
        ],
        day: DayStorm,
        night: NightStorm,
      },
      {
        condition: [
          "Patchy snow possible",
          "Light snow",
          "Patchy moderate snow",
          "Moderate snow",
          "Patchy heavy snow",
          "Heavy snow",
          "Blowing snow",
        ],
        day: DaySnow,
        night: NightSnow,
      },
    ];
  }

  getImagePath(condition, is_day) {
    const timeOfDay = is_day ? "day" : "night";
    const conditionData = this.conditionsMap.find((item) =>
      Array.isArray(item.condition)
        ? item.condition.some(
            (c) => c.toLowerCase() === condition.toLowerCase()
          )
        : item.condition.toLowerCase() === condition.toLowerCase()
    );

    if (!conditionData) {
      console.warn(`No image mapping found for condition: ${condition}`);
      return is_day ? DayClouds : NightClouds;
    }

    return conditionData[timeOfDay];
  }

  formatDate(date) {
    // Get parts of the date
    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()]; // Month is 0-based
    const year = date.getFullYear();

    // Return formatted date
    return `${day} ${month}, ${year}`;
  }

  async updateMain(
    temp_c,
    condition,
    maxtemp_c,
    mintemp_c,
    city,
    country,
    localtime,
    is_day,
    feelslike
  ) {
    const date = new Date(localtime);
    const datestring = this.formatDate(date);
    const dayOfWeek = date.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const imagePath = this.getImagePath(condition, is_day);
    // Now you can use imagePath to update your DOM
    // Example: document.querySelector('#big-weather-img').src = imagePath;
    this.main.innerHTML = `
    <div class="left">
                <div class="country"><svg width="15" height="20" viewBox="0 0 15 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M7.5 5.625C6.46437 5.625 5.625 6.46437 5.625 7.5C5.625 8.53562 6.46437 9.375 7.5 9.375C8.53562 9.375 9.375 8.53562 9.375 7.5C9.375 6.46437 8.53562 5.625 7.5 5.625ZM7.5 10.625C5.77437 10.625 4.375 9.22625 4.375 7.5C4.375 5.77375 5.77437 4.375 7.5 4.375C9.22562 4.375 10.625 5.77375 10.625 7.5C10.625 9.22625 9.22562 10.625 7.5 10.625ZM7.5 0C3.35812 0 0 3.35812 0 7.5C0 10.6362 6.25312 20.0069 7.5 20C8.7275 20.0069 15 10.5937 15 7.5C15 3.35812 11.6419 0 7.5 0Z"
                            fill="white" />
                    </svg>
                    ${city}, ${country}</div>
                <div class="today-date">
                    <div class="week-day">${days[dayOfWeek]}</div>
                    <div class="date">${datestring}</div>
                </div>
                <div class="today-weather">
                    <div class="temperature">
                        <span class="temperature-number">${temp_c}</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="6.5" stroke="white" stroke-width="3" />
                        </svg>
                        <span class="temperature-unit">C</span>
                    </div>
                    <div class="temperature-description">High:${maxtemp_c} Low:${mintemp_c}</div>
                </div>
            </div>
            <div class="right">
                <img id="big-weather-img" src="${imagePath}" alt="">
                <div class="weather-description">
                    <div class="weather-title">${condition}</div>
                    <div class="weather-feels-like"> Feels Like ${feelslike}</div>
                </div>
            </div>
    `;
  }
}
