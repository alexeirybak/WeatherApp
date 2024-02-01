import { useContext, useState, useEffect } from 'react';
import { Loader } from '../../../utils/Loader';
import { WeatherContext } from '../../../App';
import { getWindDirection } from '../../../utils/getWindDirection';
import windDir from './wind-direction.svg';
import * as S from './lowMainPanel.styled';

export const LowMainPanel = ({ isLoading }) => {
  const { weatherData } = useContext(WeatherContext);
  let [widthIndicate, setWidthIndicate] = useState('50%');

  const windSpeed = Math.round(weatherData?.wind?.speed) || 0;
  const humidity = weatherData?.main?.humidity || 50;
  const preVisibility = weatherData.visibility || 0;
  let visibility;

  if (preVisibility >= 10000) {
    visibility = Math.round(preVisibility / 1000);
  } else {
    visibility = (preVisibility / 1000).toFixed(1);
  }

  const pressure = Math.round(weatherData?.main?.pressure * 0.750062) || 0;
  let deg = +weatherData?.wind?.deg;
  let direction = getWindDirection(deg) || 0;

  useEffect(() => {
    const calcWidth = () => {
      let newWidthBlockIndicate =
        document.getElementById('parentElement').offsetWidth;

      setWidthIndicate((humidity * newWidthBlockIndicate) / 100);
    };

    calcWidth();

    window.addEventListener('resize', calcWidth);

    return () => {
      window.removeEventListener('resize', calcWidth);
    };
  }, [humidity]);

  return (
    <S.DataDetails>
      <S.DataPanelForecast>Подробно на сегодня</S.DataPanelForecast>
      <S.DataDetailsBlock>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <S.TextMiddle>Скорость ветра</S.TextMiddle>
            <S.TextLarge>
              {windSpeed} <span>м/с</span>
            </S.TextLarge>
            <S.DataWind>
              <S.DataWindDirection
                $deg={deg}
                src={windDir}
                alt='Направление ветра'
              />
              <S.TextMiddle>{direction}</S.TextMiddle>
            </S.DataWind>
          </>
        )}
      </S.DataDetailsBlock>
      <S.DataDetailsBlockVis>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <S.TextMiddle>Видимость</S.TextMiddle>
            <S.TextLarge>
              {visibility} <span>км</span>
            </S.TextLarge>
          </>
        )}
      </S.DataDetailsBlockVis>
      <S.DataDetailsBlockHum>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <S.TextMiddle>Влажность</S.TextMiddle>
            <S.TextLarge>
              {humidity} <span>%</span>
            </S.TextLarge>
            <S.HumidityScale>
              <S.HumidityScaleMarkers>
                <S.Markers>0</S.Markers>
                <S.Markers>50</S.Markers>
                <S.Markers>100</S.Markers>
              </S.HumidityScaleMarkers>
              <S.HumidityScaleImagine id='parentElement'>
                <S.HumidityScaleIndicate
                  style={{ width: `${widthIndicate}px` }}
                ></S.HumidityScaleIndicate>
              </S.HumidityScaleImagine>
              <S.HumidityScaleHundred>%</S.HumidityScaleHundred>
            </S.HumidityScale>
          </>
        )}
      </S.DataDetailsBlockHum>
      <S.DataDetailsBlockAtm>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <S.TextMiddle>Давление</S.TextMiddle>
            <S.TextLargePressure>
              {pressure} <span>мм рт.ст.</span>
            </S.TextLargePressure>
          </>
        )}
      </S.DataDetailsBlockAtm>
    </S.DataDetails>
  );
};
