export const formatCityName = (city) => {
  if (
    city === 'спб' ||
    city === 'СПБ' ||
    city === 'СПб' ||
    city === 'питер' ||
    city === 'Питер'
  ) {
    city = 'Санкт-Петербург';
  }
  if (city === 'МСК' || city === 'мск' || city === 'Мск') {
    city = 'Москва';
  }
  city = city.split('-');
  for (let i = 0; i < city.length; i++) {
    city[i] = city[i][0].toUpperCase() + city[i].slice(1);
  }
  return (city = city.join('-'));
};
