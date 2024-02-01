export const getWindDirection = (deg) => {
  let direction;

  if ((deg >= 0 && deg < 22.5) || deg >= 337.5) {
    direction = 'С';
  }
  if (deg >= 22.5 && deg < 67.5) {
    direction = 'CВ';
  }
  if (deg >= 67.5 && deg < 112.5) {
    direction = 'В';
  }
  if (deg >= 112.5 && deg < 157.5) {
    direction = 'ЮВ';
  }
  if (deg >= 157.5 && deg < 202.5) {
    direction = 'Ю';
  }
  if (deg >= 202.5 && deg < 247.5) {
    direction = 'ЮЗ';
  }
  if (deg >= 247.5 && deg < 292.5) {
    direction = 'З';
  }
  if (deg >= 292.5 && deg < 337.5) {
    direction = 'СЗ';
  }

  return direction;
};
