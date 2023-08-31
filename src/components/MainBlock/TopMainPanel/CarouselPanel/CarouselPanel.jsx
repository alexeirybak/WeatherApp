import React, { useContext, useState, useEffect } from 'react';
import styles from './carouselPanel.module.css';
import { Loader } from '../../../../utils/Loader';
import { WeatherContext } from '../../../../App';
import { getForecast } from '../../../../utils/getApiData';
import { processWeatherData } from '../../../../utils/processWeatherData';
import { dummyDaily, dummyHourly } from '../../../../utils/mocData';

export function CarouselPanel({ isWeek, isLoading }) {
  const [elementsRowHours, setElementsRowHours] = useState(0);
  const [elementsRowDays, setElementsRowDays] = useState(0);
  const { weatherData } = useContext(WeatherContext);
  const [forecast, setForecast] = useState('');
  const [currentHourIndex, setCurrentHourIndex] = useState(0);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const handleNextHour = () => {
    setCurrentHourIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevHour = () => {
    setCurrentHourIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevDay = () => {
    setCurrentDayIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    if (weatherData && weatherData.coord) {
      let lat = weatherData.coord.lat;
      let lon = weatherData.coord.lon;

      getForecast(lat, lon)
        .then((forecast) => {
          setForecast(forecast);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [weatherData]);

  let { hourlyWeather, checkedDailyWeather } = processWeatherData(forecast);

  if (hourlyWeather.length === 0) {
    hourlyWeather = dummyHourly;
  }
  if (checkedDailyWeather.length === 0) {
    checkedDailyWeather = dummyDaily;
  }

  useEffect(() => {
    function calcEl() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1440) {
        setElementsRowHours(6);
        setElementsRowDays(5);
      } else if (screenWidth >= 834 && screenWidth <= 1439) {
        setElementsRowHours(3);
        setElementsRowDays(3);
      } else {
        setElementsRowHours(12);
        setElementsRowDays(5);
      }
    }

    calcEl();

    window.addEventListener('resize', calcEl);

    return () => {
      window.removeEventListener('resize', calcEl);
    };
  }, []);

  const isPrevButtonHoursDisabled = currentHourIndex === 0;
  const isNextButtonHoursDisabled =
    currentHourIndex + elementsRowHours >= hourlyWeather.length;

  const isPrevButtonDaysDisabled = currentDayIndex === 0;
  const isNextButtonDaysDisabled =
    currentDayIndex + elementsRowHours >= checkedDailyWeather.length;

  if (isWeek) {
    const hourItems = hourlyWeather
      .slice(currentHourIndex, currentHourIndex + elementsRowHours)
      .map((item, i) => {
        const { time, sky, description, degreeDay } = item;

        return (
          <div key={i} className={styles.data_time}>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <p className={styles.text_item}>{`${time}:00`}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${sky}@2x.png`}
                  alt={description}
                  className={styles.sky}
                />
                <div className={styles.data_temperature}>
                  <p className={styles.text_item}>{degreeDay}&#176;C</p>
                </div>
              </>
            )}
          </div>
        );
      });

    return (
      <>
        <button
          className={`${styles.arrow_widget_left} ${
            isPrevButtonHoursDisabled
              ? styles.arrow_active
              : styles.arrow_disable
          }`}
          onClick={handlePrevHour}
          disabled={isPrevButtonHoursDisabled}
        >
          <svg
            width='38'
            height='38'
            viewBox='0 0 38 38'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              opacity='0.3'
              cx='19'
              cy='19'
              r='19'
              transform='rotate(-180 19 19)'
              fill='white'
            />
            <path
              opacity='0.3'
              d='M23 24.5L13.8735 18.8503C13.242 18.4593 13.242 17.5407 13.8735 17.1497L23 11.5'
              stroke='#ACACAC'
              strokeWidth='3'
            />
          </svg>
        </button>
        <ul className={`${styles.data_carousel} ${styles.hours}`}>
          {hourItems}
        </ul>
        <button
          className={`${styles.arrow_widget_right} ${
            isNextButtonHoursDisabled
              ? styles.arrow_active
              : styles.arrow_disable
          }`}
          onClick={handleNextHour}
          disabled={isNextButtonHoursDisabled}
        >
          <svg
            width='38'
            height='38'
            viewBox='0 0 38 38'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='19' cy='19' r='19' fill='white' />
            <path
              d='M15 13.5L24.1265 19.1497C24.758 19.5407 24.758 20.4593 24.1265 20.8503L15 26.5'
              stroke='#ACACAC'
              strokeWidth='3'
            />
          </svg>
        </button>
      </>
    );
  } else {
    const dayItems = checkedDailyWeather
      .slice(currentDayIndex, currentDayIndex + elementsRowDays)
      .map((item, i) => {
        const { date, sky, description, degreeDay, degreeNight } = item[0];
        return (
          <div key={i} className={styles.data_time}>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <p className={styles.text_item}>{date}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${sky}@2x.png`}
                  alt={description}
                  className={styles.sky}
                />
                <div className={styles.data_temperature}>
                  <p className={styles.text_item}>{degreeDay}&#176;C</p>
                  <p className={`${styles.text_item} ${styles.temp_night}`}>
                    {degreeNight}&#176;C
                  </p>
                </div>
              </>
            )}
          </div>
        );
      });

    return (
      <>
        <button
          className={`${styles.arrow_widget_left} ${
            isPrevButtonDaysDisabled
              ? styles.arrow_active
              : styles.arrow_disable
          }`}
          onClick={handlePrevDay}
          disabled={isPrevButtonDaysDisabled}
        >
          <svg
            width='38'
            height='38'
            viewBox='0 0 38 38'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              opacity='0.3'
              cx='19'
              cy='19'
              r='19'
              transform='rotate(-180 19 19)'
              fill='white'
            />
            <path
              opacity='0.3'
              d='M23 24.5L13.8735 18.8503C13.242 18.4593 13.242 17.5407 13.8735 17.1497L23 11.5'
              stroke='#ACACAC'
              strokeWidth='3'
            />
          </svg>
        </button>
        <ul className={`${styles.data_carousel} ${styles.week}`}>{dayItems}</ul>
        <button
          className={`${styles.arrow_widget_right} ${
            isNextButtonDaysDisabled
              ? styles.arrow_active
              : styles.arrow_disable
          }`}
          onClick={handleNextDay}
          disabled={isNextButtonDaysDisabled}
        >
          <svg
            width='38'
            height='38'
            viewBox='0 0 38 38'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='19' cy='19' r='19' fill='white' />
            <path
              d='M15 13.5L24.1265 19.1497C24.758 19.5407 24.758 20.4593 24.1265 20.8503L15 26.5'
              stroke='#ACACAC'
              strokeWidth='3'
            />
          </svg>
        </button>
      </>
    );
  }
}
