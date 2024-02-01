export const getCurrentDate = () => {
  let currentDate = new Date();
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  currentDate = currentDate.toLocaleDateString('ru-RU', options);
  currentDate = currentDate.replace(/\.$/, '');
  return currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
};

export const formatTimeHourly = (time) => {
  const currentDate = new Date();
  const date = new Date(time * 1000);
  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
  };
  let formattedDate = date.toLocaleString('default', options);
  formattedDate = formattedDate.replace('.', '');

  if (date.toDateString() === currentDate.toDateString()) {
    const options = {
      hour: 'numeric',
    };
    let formattedDate = date.toLocaleString('default', options);
    return 'Сегодня ' + formattedDate;
  }

  const tomorrowDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  if (date.toDateString() === tomorrowDate.toDateString()) {
    const options = {
      hour: 'numeric',
    };
    let formattedDate = date.toLocaleString('default', options);
    return 'Завтра ' + formattedDate;
  }

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

export const formatTimeDaily = (time) => {
  const date = new Date(time * 1000);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Завтра';
  } else {
    let dayOfWeek = date.toLocaleString('ru-RU', { weekday: 'short' });
    dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    const dayOfMonth = date.getDate();
    let month = date.toLocaleString('ru-RU', { month: 'short' });
    month = month.replace(/\.$/, '');

    return `${dayOfWeek}, ${dayOfMonth} ${month}`;
  }
};
