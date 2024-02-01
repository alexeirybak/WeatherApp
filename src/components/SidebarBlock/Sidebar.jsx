import { useContext, useEffect, useState } from 'react';
import { Switch } from './Switch/Switch';
import { Loader } from '../../utils/Loader';
import { getWeather } from '../ApiBlock/apiGetData';
import { getCity } from '../ApiBlock/apiGetCity';
import { formatCityName } from '../../utils/formatCityName';
import { getCurrentDate } from '../../utils/timeFormatter';
import { WeatherContext } from '../../App';
import searcher from './searcher.svg';
import location from './location.svg';
import * as S from './sidebar.styled';

document.documentElement.setAttribute('data-theme', 'light');
const currentDate = new Date();
const currentHour = currentDate.getHours();
const isNight = currentHour >= 22 || currentHour <= 6;

if (isNight || localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
}

export const Sidebar = ({ isLoading, setIsLoading }) => {
  const [isLocAppeared, setIsLocAppeared] = useState(false);
  const [message, setMessage] = useState('');
  let [city, setCity] = useState('Москва');
  let [citiesArray, setCitiesArray] = useState(
    JSON.parse(localStorage.getItem('citiesArray')) || [],
  );
  const { weatherData, setWeatherData } = useContext(WeatherContext);

  const findCity = () => {
    const cityInput = document.getElementById('cityInput').value.trim();
    let regexp = /^[а-яА-Я0-9-\s]*$/;
    if (regexp.test(cityInput) && cityInput.trim() !== '') {
      let city = formatCityName(cityInput);
      document.getElementById('cityInput').value = '';
      chooseCity(city);
    } else {
      setIsLoading(false);
      setMessage('Пожалуйста, используйте только кириллицу');
    }
  };

  const handleInput = (event) => {
    let value = event.target.value;
    value = value.trim().replace(/\s{2,}/g, ' ');
    const pattern = /[а-яёЁ\s]/i;
    if (!pattern.test(value) && value.length > 0) {
      setMessage('Пожалуйста, используйте только кириллицу');
    } else {
      setMessage('');
    }
  };

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

  const sideShow = () => {
    setMessage('');
    setIsLocAppeared(!isLocAppeared);
    document.getElementById('cityInput').value = '';
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      findCity();
    }
  };

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
    sideShow();
    setCity(city);
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
    <S.Loc>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <S.LocFront>
            <S.LocFrontTop>
              <S.LocFinder onClick={sideShow}>Поиск города</S.LocFinder>
              <Switch />
            </S.LocFrontTop>
            <S.LocImg src={iconUrl} alt='Иконка погоды' />
            <S.LocInfo>
              <S.LocParamText>
                {Math.round(weatherData?.main?.temp) || -1} <span>&#176;C</span>
              </S.LocParamText>
              <S.LocPrecipitationText>
                {capitalizedPrecipitation}
              </S.LocPrecipitationText>
              <S.LocFeel>
                Ощущается как {Math.round(weatherData?.main?.feels_like) || -3}{' '}
                &#176;C
              </S.LocFeel>
            </S.LocInfo>
            <S.LocPosition>
              <S.TextMiddleLoc>Сегодня</S.TextMiddleLoc>
              <S.TextMiddleLoc>{formattedDate}</S.TextMiddleLoc>
            </S.LocPosition>
            <S.TextMiddleLoc>
              <S.LocIcon src={location} alt='Локация' />
              {city}
            </S.TextMiddleLoc>
          </S.LocFront>
          <S.LocAppeared $isLocAppeared={isLocAppeared}>
            <S.LocCloser onClick={sideShow}>
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
                  fill='var(--big-text)'
                />
              </svg>
            </S.LocCloser>
            <S.LocFind>
              <S.LocFindIcon>
                <S.StyledInput
                  type='search'
                  placeholder='Введите город'
                  id='cityInput'
                  pattern='^[?!,.-а-яА-ЯёЁ\s]+$'
                  title='Пожалуйста, используйте только кириллицу'
                  onKeyDown={handleKeyDown}
                  onInput={handleInput}
                />
                <S.LocSearchFinder onClick={findCity}>Найти</S.LocSearchFinder>
                <S.FindIcon src={searcher} alt='Найти' />
              </S.LocFindIcon>
              {message && <S.SearchNotRuInput>{message}</S.SearchNotRuInput>}
              <S.FindIconList>
                <S.CityList>
                  {stack.map((city, index) => (
                    <S.LocBtnCity
                      key={index}
                      onClick={() => chooseCity(city)}
                      content={city}
                    >
                      {city}
                    </S.LocBtnCity>
                  ))}
                </S.CityList>
              </S.FindIconList>
            </S.LocFind>
          </S.LocAppeared>
        </>
      )}
    </S.Loc>
  );
};
