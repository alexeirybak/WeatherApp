import React, { useState } from 'react';
import { CarouselPanel } from './CarouselPanel/CarouselPanel';
import styles from './topMainPanel.module.css';

export function TopMainPanel({ isLoading, setIsloading }) {
  const [isWeek, setIsWeek] = useState(true);

  return (
    <section className={styles.data_widget}>
      <div className={styles.data_panel}>
        <h1 className={styles.data_panel_forecast}>Прогноз</h1>
        <div className={styles.data_panel_nav}>
          <button
            id='week'
            className={`${isWeek ? styles.default_link : styles.active_link}`}
            onClick={() => setIsWeek(false)}
          >
            на неделю
          </button>
          <button
            id='hours'
            className={`${!isWeek ? styles.default_link : styles.active_link}`}
            onClick={() => setIsWeek(true)}
          >
            почасовой
          </button>
        </div>
      </div>
      <CarouselPanel
        isWeek={isWeek}
        isLoading={isLoading}
        setIsLoading={setIsloading}
      />
    </section>
  );
}
