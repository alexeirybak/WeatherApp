import React, { useContext, useState, useEffect } from 'react';
import { Loader } from '../../../../utils/Loader';
import { WeatherContext } from '../../../../App';
import { getForecast } from '../../../ApiBlock/apiGetData';
import { processWeatherData } from '../../../../utils/processWeatherData';
import { dummyDaily, dummyHourly } from '../../../../utils/mocData';
import { ArrowLeft } from './ArrowLeft';
import { ArrowRight } from './ArrowRight';
import * as S from './CarouselPanel.styled';

export const CarouselPanel = ({ isWeek, isLoading }) => {
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
    const calcEl = () => {
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
    };

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

  const items = isWeek
    ? hourlyWeather
        .slice(currentHourIndex, currentHourIndex + elementsRowHours)
        .map((item, i) => {
          const { time, sky, description, degreeDay } = item;

          return (
            <S.DataTime key={i}>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <S.TextItem>{`${time}:00`}</S.TextItem>
                  <S.Sky
                    src={`https://openweathermap.org/img/wn/${sky}@2x.png`}
                    alt={description}
                  />
                  <S.DataTemperature>
                    <S.TextItem>{degreeDay}&#176;C</S.TextItem>
                  </S.DataTemperature>
                </>
              )}
            </S.DataTime>
          );
        })
    : checkedDailyWeather
        .slice(currentDayIndex, currentDayIndex + elementsRowDays)
        .map((item, i) => {
          const { date, sky, description, degreeDay, degreeNight } = item[0];
          return (
            <S.DataTime key={i}>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <S.TextItem>{date}</S.TextItem>
                  <S.Sky
                    src={`https://openweathermap.org/img/wn/${sky}@2x.png`}
                    alt={description}
                  />
                  <S.DataTemperature>
                    <S.TextItem>{degreeDay}&#176;C</S.TextItem>
                    <S.TextItemNight>{degreeNight}&#176;C</S.TextItemNight>
                  </S.DataTemperature>
                </>
              )}
            </S.DataTime>
          );
        });

  return (
    <>
      <S.ArrowBtnLeft
        onClick={isWeek ? handlePrevHour : handlePrevDay}
        disabled={isWeek ? isPrevButtonHoursDisabled : isPrevButtonDaysDisabled}
      >
        <ArrowLeft
          isPrevButtonHoursDisabled={
            isWeek ? isPrevButtonHoursDisabled : isPrevButtonDaysDisabled
          }
        />
      </S.ArrowBtnLeft>
      <S.DataCarousel>{items}</S.DataCarousel>
      <S.ArrowBtnRight
        onClick={isWeek ? handleNextHour : handleNextDay}
        disabled={isWeek ? isNextButtonHoursDisabled : isNextButtonDaysDisabled}
      >
        <ArrowRight
          isNextButtonHoursDisabled={
            isWeek ? isNextButtonHoursDisabled : isNextButtonDaysDisabled
          }
        />
      </S.ArrowBtnRight>
    </>
  );
};
