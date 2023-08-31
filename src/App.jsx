import React, { createContext, useState } from 'react';
import { Sidebar } from './components/SidebarBlock/Sidebar';
import { TopMainPanel } from './components/MainBlock/TopMainPanel/TopMainPanel';
import { LowMainPanel } from './components/MainBlock/LowMainPanel/LowMainPanel';

export const WeatherContext = createContext({});

export function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  return (
    <div className='app' data-theme='light'>
      <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
        <Sidebar isLoading={isLoading} setIsLoading={setIsLoading} />
        <main className='data'>
          <TopMainPanel isLoading={isLoading} setIsLoading={setIsLoading} />
          <LowMainPanel isLoading={isLoading} setIsLoading={setIsLoading} />
        </main>
      </WeatherContext.Provider>
    </div>
  );
}
