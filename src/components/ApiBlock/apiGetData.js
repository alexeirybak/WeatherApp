export const getWeather = async (lat, lon) => {
  const apiKey = '21916db489e3429601b616a34c61e5a7';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=ru&units=metric`,
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error('Не удалось загрузить прогноз погоды');
  }
};

export const getForecast = async (lat, lon) => {
  const apiKey = '21916db489e3429601b616a34c61e5a7';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=ru&units=metric`,
  );
  const forecast = await response.json();

  if (response.ok) {
    return forecast;
  } else {
    throw new Error('Не удалось загрузить прогноз погоды');
  }
};
