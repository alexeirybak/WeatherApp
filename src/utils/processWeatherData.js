import { formatTimeHourly, formatTimeDaily } from './timeFormatter';

export const processWeatherData = (forecast) => {
  const hourlyWeather = [];
  const previousDailyWeather = [];

  for (let i = 0; i < 12; i++) {
    if (forecast && forecast.list && forecast.list[i]) {
      const time = formatTimeHourly(forecast.list[i].dt);

      hourlyWeather.push({
        time,
        sky: forecast.list[i].weather[0].icon,
        description: forecast.list[i].weather[0].description,
        degreeDay: Math.round(forecast.list[i].main.temp),
      });
    }
  }

  for (let i = 0; i < 40; i++) {
    if (forecast && forecast.list && forecast.list[i]) {
      const date = formatTimeDaily(forecast.list[i].dt);

      const currentDate = new Date();
      const forecastDate = new Date(forecast.list[i].dt * 1000);
      if (currentDate.toDateString() === forecastDate.toDateString()) {
        continue;
      }

      previousDailyWeather.push({
        date,
        sky: forecast.list[i].weather[0].icon,
        description: forecast.list[i].weather[0].description,
        degreeDay: Math.round(forecast.list[i].main.temp_max),
        degreeNight: Math.round(forecast.list[i].main.temp_min),
      });
    }
  }

  const combinedDailyWeather = Object.values(previousDailyWeather);

  const dividedDailyWeather = {};
  combinedDailyWeather.forEach((weatherData) => {
    const date = weatherData.date;
    if (!dividedDailyWeather[date]) {
      dividedDailyWeather[date] = [];
    }
    dividedDailyWeather[date].push(weatherData);
  });

  const checkedDailyWeather = Object.values(dividedDailyWeather);

  checkedDailyWeather.forEach((weatherData) => {
    const skyCounts = {};
    const descriptionCounts = {};

    weatherData.forEach((data) => {
      skyCounts[data.sky] = (skyCounts[data.sky] || 0) + 1;
      descriptionCounts[data.description] =
        (descriptionCounts[data.description] || 0) + 1;
    });

    const mostFrequentSky = Object.keys(skyCounts).reduce((a, b) =>
      skyCounts[a] > skyCounts[b] ? a : b,
    );
    const mostFrequentDescription = Object.keys(descriptionCounts).reduce(
      (a, b) => (descriptionCounts[a] > descriptionCounts[b] ? a : b),
    );

    const maxDegreeDay = Math.max(...weatherData.map((data) => data.degreeDay));
    const minDegreeNight = Math.min(
      ...weatherData.map((data) => data.degreeNight),
    );

    weatherData.splice(1);

    weatherData[0].sky = mostFrequentSky;
    weatherData[0].description = mostFrequentDescription;
    weatherData[0].degreeDay = maxDegreeDay;
    weatherData[0].degreeNight = minDegreeNight;
  });

  return {
    hourlyWeather,
    checkedDailyWeather,
  };
};
