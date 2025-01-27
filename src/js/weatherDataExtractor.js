export class weatherDataExtractor {
  constructor(WeatherData) {
    this.WeatherData = WeatherData;
    this.temp_c = WeatherData.current.temp_c;
    this.localtime = WeatherData.location.localtime;
    this.condition = WeatherData.current.condition.text;
    this.wind_kph = WeatherData.current.wind_kph;
    this.uv_index = WeatherData.current.uv;
    this.humidity = WeatherData.current.humidity;
    this.rain_chance =
      WeatherData.forecast.forecastday[0].day.daily_chance_of_rain;
    this.Is_day = WeatherData.current.is_day; // 0 for night and 1 for day
    this.maxtemp_c = WeatherData.forecast.forecastday[0].day.maxtemp_c;
    this.mintemp_c = WeatherData.forecast.forecastday[0].day.mintemp_c;
    this.tomorrow_weather =
      WeatherData.forecast.forecastday[1].day.condition.text;
    this.tomorrow_temp = WeatherData.forecast.forecastday[1].day.avgtemp_c;
    this.hourlyTemp = this.getHourlyTemperature();
    console.log(this.hourlyTemp);
  }
  getHourlyTemperature() {
    // Get current hour and date
    const currentDateTime = new Date(this.localtime);
    const currentHour = currentDateTime.getHours();
    // Get today's and tomorrow's forecast hours
    const todayHours = this.WeatherData.forecast.forecastday[0].hour;
    const tomorrowHours = this.WeatherData.forecast.forecastday[1].hour;

    // Combine today and tomorrow for seamless wrapping
    const combinedHours = [...todayHours, ...tomorrowHours];

    // Find current hour index
    const currentIndex = combinedHours.findIndex((hour) => {
      const hourTime = new Date(hour.time);
      return (
        hourTime.getHours() === currentHour &&
        hourTime.getDate() === currentDateTime.getDate()
      );
    });

    // Get next 6 hours from current hour
    return combinedHours.slice(currentIndex, currentIndex + 7).map((hour) => ({
      time: new Date(hour.time).getHours(),
      temp: hour.temp_c,
      condition: hour.condition.text,
      is_day: hour.is_day,
    }));
  }
}
