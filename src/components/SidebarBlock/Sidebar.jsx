import React, { useContext, useEffect, useState } from 'react';
import { Switch } from './Switch/Switch';
import styles from './sidebar.module.css';
import { Loader } from '../../utils/Loader';
import { getWeather } from '../../utils/getApiData';
import { getCity } from '../../utils/getCity';
import { formatCityName } from '../../utils/formatCityName';
import { getCurrentDate } from '../../utils/timeFormatter';
import { WeatherContext } from '../../App';

document.documentElement.setAttribute('data-theme', 'light');
const currentDate = new Date();
const currentHour = currentDate.getHours();
const isNight = currentHour >= 22 || currentHour <= 6;

if (isNight || localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
}

export function Sidebar({ isLoading, setIsLoading }) {
  const [isLocAppeared, setIsLocAppeared] = useState(false);
  const [message, setMessage] = useState('');
  let [city, setCity] = useState('Москва');
  let [citiesArray, setCitiesArray] = useState(
    JSON.parse(localStorage.getItem('citiesArray')) || [],
  );
  const { weatherData, setWeatherData } = useContext(WeatherContext);

  useEffect(() => {
    if (localStorage.getItem('citiesArray')) {
      const citiesArray = JSON.parse(localStorage.getItem('citiesArray'));
      const lastCity = citiesArray[citiesArray.length - 1];
      getCity(lastCity).then((data) => {
        getWeather(data.lat, data.lon)
          .then((data) => {
            setWeatherData(data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('citiesArray', JSON.stringify(citiesArray));
  }, [citiesArray]);

  citiesArray = citiesArray.slice(-5);

  function sideAppear() {
    setMessage('');
    setIsLocAppeared(!isLocAppeared);
    document.getElementById('cityInput').value = '';
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      finderCity();
    }
  }

  const chooseCity = (city) => {
    setIsLocAppeared(true);
    setIsLoading(true);
    getCity(city)
      .then((data) => {
        getWeather(data.lat, data.lon)
          .then((data) => {
            setWeatherData(data);
            setCitiesArray((citiesArray) => [...citiesArray, city]);
            localStorage.setItem('citiesArray', JSON.stringify(citiesArray));
            setIsLoading(false);
            setIsLocAppeared(false);
          })
          .catch((error) => {
            setMessage(error.message);
            setIsLoading(false);
            setIsLocAppeared(true);
          });
      })
      .catch((error) => {
        setMessage(error.message);
        setIsLoading(false);
        setIsLocAppeared(true);
      });
    sideAppear();
    setCity(city);
  };

  const finderCity = () => {
    const cityInput = document.getElementById('cityInput').value.trim();
    let regexp = /^[а-яА-Я0-9-\s]*$/;
    if (regexp.test(cityInput) && cityInput.trim() !== '') {
      let city = formatCityName(cityInput);
      document.getElementById('cityInput').value = '';
      chooseCity(city);
    } else {
      setIsLoading(false);
      setMessage('Введите название на русском языке!');
    }
  };

  let stack = [];

  citiesArray.forEach((city) => {
    if (!stack.includes(city)) {
      stack.unshift(city);
    }
  });

  const precipitation =
    weatherData?.weather?.[0]?.description || 'Переменная облачность';
  const capitalizedPrecipitation = precipitation
    ? precipitation.charAt(0).toUpperCase() + precipitation.slice(1)
    : '';

  const iconUrl = weatherData?.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`
    : './img/defaultIcon.png';

  const formattedDate = getCurrentDate();

  city = weatherData?.name || 'Москва';

  return (
    <section className={styles.loc}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.loc_front}>
            <div className={styles.loc_front_top}>
              <button className={styles.loc_finder} onClick={sideAppear}>
                Поиск города
              </button>
              <Switch />
            </div>
            <img src={iconUrl} alt='Иконка погоды' className={styles.loc_img} />
            <div className={styles.loc_info}>
              <p className={styles.param_text}>
                {Math.round(weatherData?.main?.temp) || -1} <span>&#176;C</span>
              </p>
              <p className={styles.loc_precipitation_text}>
                {capitalizedPrecipitation}
              </p>
              <p className={styles.loc_feel}>
                Ощущается как {Math.round(weatherData?.main?.feels_like) || -3}{' '}
                &#176;C
              </p>
            </div>
            <div className={styles.loc_position}>
              <p className={styles.text_middle_loc}>Сегодня</p>
              <p className={styles.text_middle_loc}>{formattedDate}</p>
            </div>
            <p className={styles.text_middle_loc}>
              <img
                src='./img/location.svg'
                alt='Локация'
                className={styles.loc_icon}
              />
              {city}
            </p>
          </div>
          <div
            className={`${
              isLocAppeared ? styles.loc_appeared_visible : styles.loc_appeared
            }`}
          >
            <button className={styles.loc_closer} onClick={sideAppear}>
              <svg
                width='26'
                height='26'
                viewBox='0 0 26 26'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  id='closer'
                  d='M26 2.61857L23.3814 0L13 10.3814L2.61857 0L0 2.61857L10.3814 13L0 23.3814L2.61857 26L13 15.6186L23.3814 26L26 23.3814L15.6186 13L26 2.61857Z'
                  fill='#48484A'
                />
              </svg>
            </button>
            <div className={styles.loc_find}>
              <div className={styles.loc_find_icon}>
                <input
                  type='search'
                  className={styles.loc_search}
                  placeholder='Введите город'
                  id='cityInput'
                  pattern='^[?!,.-а-яА-ЯёЁ\s]+$'
                  title='Пожалуйста, используйте только кириллицу'
                  onKeyDown={handleKeyDown}
                />
                <button
                  className={`${styles.loc_search} ${styles.loc_search_finder} ${styles.loc_search_finder_mob}`}
                  onClick={finderCity}
                >
                  Найти
                </button>
                <img
                  src='./img/searcher.svg'
                  alt='Найти'
                  className={styles.find_icon}
                />
              </div>
              {message && <p className={styles.not_ru_input}>{message}</p>}
              <div className={styles.find_icon_list}>
                <ul>
                  {stack.map((city, index) => (
                    <li
                      className={styles.loc_button_city}
                      key={index}
                      onClick={() => chooseCity(city)}
                      content={city}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
