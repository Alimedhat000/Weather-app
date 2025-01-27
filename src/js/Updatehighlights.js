export class HighlightUpdater {
  constructor() {
    this.highlightsContainer = document.querySelector(".cards-container");
  }

  updateHighlights(wind_kph, uv_index, humidity, rain_chance) {
    const SubTexts = this.getWeatherSubtexts(
      wind_kph,
      uv_index,
      humidity,
      rain_chance
    );
    this.highlightsContainer.innerHTML = `                
                <div class="highlight-card" id="rain-chance">
                    <div class="title">Rain Chance</div>
                    <div class="value">${rain_chance}%</div>
                    <div class="additional-info">${SubTexts.rain}</div>
                </div>
                <div class="highlight-card" id="uv-index">
                    <div class="title">UV Index</div>
                    <div class="value">${uv_index}</div>
                    <div class="additional-info">${SubTexts.uv}</div>
                </div>
                <div class="highlight-card" id="wind-status">
                    <div class="title">Wind Status</div>
                    <div class="value">${wind_kph}km/h</div>
                    <div class="additional-info">${SubTexts.wind}</div>
                </div>
                <div class="highlight-card" id="humidity">
                    <div class="title">Humidity</div>
                    <div class="value">${humidity}%</div>
                    <div class="additional-info">${SubTexts.humidity}</div>
                </div>`;
  }

  getWeatherSubtexts(windKph, uvIndex, humidity, rainChance) {
    // Rain chance subtexts
    const rainSubtexts = {
      "0-20": [
        "Clear skies ahead",
        "No rain expected",
        "Leave the umbrella home",
        "Dry conditions",
        "Perfect outdoor weather",
      ],
      "21-40": [
        "Slight chance of rain",
        "Maybe pack an umbrella",
        "Low rain risk",
        "Mostly dry conditions",
        "Light rain possible",
      ],
      "41-60": [
        "Rain likely",
        "Pack an umbrella",
        "Be prepared for showers",
        "Intermittent rain possible",
        "Keep rain gear handy",
      ],
      "61-80": [
        "High chance of rain",
        "Rain expected",
        "Umbrella required",
        "Wet conditions ahead",
        "Prepare for rainfall",
      ],
      "81-100": [
        "Rain incoming",
        "Definite rain ahead",
        "Heavy rain expected",
        "Very wet conditions",
        "Storm conditions likely",
      ],
    };

    // UV index subtexts
    const uvSubtexts = {
      "0-2": [
        "Minimal sun protection needed",
        "Safe for outdoor activities",
        "Low UV exposure",
        "Brief sun exposure ok",
        "Basic sun protection",
      ],
      "3-5": [
        "Some protection needed",
        "Apply sunscreen",
        "Moderate sun risk",
        "Cover up recommended",
        "Seek shade at midday",
      ],
      "6-7": [
        "Strong sun protection needed",
        "High UV risk",
        "Limit sun exposure",
        "Reapply sunscreen often",
        "Stay in shade when possible",
      ],
      "8-10": [
        "Minimize sun exposure",
        "Maximum protection needed",
        "Dangerous UV levels",
        "Stay indoors midday",
        "High skin damage risk",
      ],
      "11-15": [
        "Avoid sun exposure",
        "Extreme UV danger",
        "Indoor activities recommended",
        "Critical protection needed",
        "Severe burn risk",
      ],
    };

    // Wind status subtexts
    const windSubtexts = {
      "0-5": [
        "Calm conditions",
        "Still air",
        "No wind",
        "Perfect calm",
        "Windless",
      ],
      "6-15": [
        "Light breeze",
        "Gentle winds",
        "Perfect for walking",
        "Mild air movement",
        "Comfortable breeze",
      ],
      "16-28": [
        "Moderate winds",
        "Breezy conditions",
        "Good for sailing",
        "Noticeable wind",
        "Steady breeze",
      ],
      "29-49": [
        "Strong winds",
        "High wind advisory",
        "Secure loose items",
        "Difficult cycling",
        "Wind warning",
      ],
      "50-200": [
        "Dangerous winds",
        "Storm conditions",
        "Stay indoors",
        "Extreme wind warning",
        "Hazardous conditions",
      ],
    };

    // Humidity subtexts
    const humiditySubtexts = {
      "0-30": [
        "Very dry air",
        "Moisture needed",
        "Drink extra water",
        "Use humidifier",
        "Low comfort level",
      ],
      "31-50": [
        "Comfortable",
        "Ideal conditions",
        "Perfect humidity",
        "Pleasant air",
        "Optimal comfort",
      ],
      "51-70": [
        "Slightly humid",
        "Moderate moisture",
        "Normal conditions",
        "Good comfort level",
        "Typical humidity",
      ],
      "71-80": [
        "Humid",
        "Moisture heavy",
        "Somewhat sticky",
        "Above average",
        "High moisture",
      ],
      "81-100": [
        "Very humid",
        "Extremely sticky",
        "High discomfort",
        "Tropical conditions",
        "Maximum humidity",
      ],
    };

    // Helper function to get a random item from an array
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Helper function to get the appropriate range key for a value
    const getRange = (value, subtexts) => {
      return Object.keys(subtexts).find((range) => {
        const [min, max] = range.split("-").map(Number);
        return value >= min && value <= max;
      });
    };

    // Get random subtext for each parameter
    const getRandomSubtext = (value, subtexts) => {
      const range = getRange(value, subtexts);
      return range ? getRandomItem(subtexts[range]) : "Data unavailable";
    };

    return {
      rain: getRandomSubtext(Math.round(rainChance), rainSubtexts),
      uv: getRandomSubtext(Math.round(uvIndex), uvSubtexts),
      wind: getRandomSubtext(Math.round(windKph), windSubtexts),
      humidity: getRandomSubtext(Math.round(humidity), humiditySubtexts),
    };
  }
}
