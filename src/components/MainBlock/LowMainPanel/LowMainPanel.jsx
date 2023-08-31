import React, { useContext, useState, useEffect } from 'react';
import styles from './lowMainPanel.module.css';
import { Loader } from '../../../utils/Loader';
import { WeatherContext } from '../../../App';
import { getWindDirection } from '../../../utils/getWindDirection';

export function LowMainPanel({ isLoading }) {
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
    function calcWidth() {
      let newWidthBlockIndicate =
        document.getElementById('parentElement').offsetWidth;

      setWidthIndicate((humidity * newWidthBlockIndicate) / 100);
    }

    calcWidth();

    window.addEventListener('resize', calcWidth);

    return () => {
      window.removeEventListener('resize', calcWidth);
    };
  }, [humidity]);

  return (
    <section className={styles.data_details}>
      <h2 className={`${styles.data_panel_forecast} ${styles.today}`}>
        Подробно на сегодня
      </h2>
      <div className={`${styles.data_details_block} ${styles.blow}`}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <p className={styles.text_middle}>Скорость ветра</p>
            <p className={styles.text_large}>
              {windSpeed} <span>м/с</span>
            </p>
            <div className={styles.data_wind}>
              <img
                src='./img/wind-direction.svg'
                alt='Направление ветра'
                className={styles.data_wind_direction}
                style={{ transform: `rotate(${deg + 225}deg)` }}
              />
              <p className={styles.text_middle}>{direction}</p>
            </div>
          </>
        )}
      </div>
      <div className={`${styles.data_details_block} ${styles.visibility}`}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <p className={styles.text_middle}>Видимость</p>
            <p className={styles.text_large}>
              {visibility} <span>км</span>
            </p>
          </>
        )}
      </div>
      <div className={`${styles.data_details_block} ${styles.humidity}`}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <p className={styles.text_middle}>Влажность</p>
            <p className={styles.text_large}>
              {humidity} <span>%</span>
            </p>
            <div className={styles.humidity_scale}>
              <div className={styles.humidity_scale_markers}>
                <div>0</div>
                <div>50</div>
                <div>100</div>
              </div>
              <div id='parentElement' className={styles.humidity_scale_imagine}>
                <div
                  className={styles.humidity_scale_indicate}
                  style={{ width: `${widthIndicate}px` }}
                ></div>
              </div>
              <div className={styles.humidity_scale_hundred}>%</div>
            </div>
          </>
        )}
      </div>
      <div className={`${styles.data_details_block} ${styles.atm}`}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <p className={styles.text_middle}>Давление</p>
            <p className={`${styles.text_large} ${styles.pressure}`}>
              {pressure} <span>мм рт.ст.</span>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
