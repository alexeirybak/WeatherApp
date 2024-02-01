import { createContext, useState } from 'react';
import { Sidebar } from './components/SidebarBlock/Sidebar';
import { TopMainPanel } from './components/MainBlock/TopMainPanel/TopMainPanel';
import { LowMainPanel } from './components/MainBlock/LowMainPanel/LowMainPanel';
import { GlobalStyle } from './styles/GlobalStyle';
import * as S from './App.styled';

export const WeatherContext = createContext({});

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  return (
    <>
      <GlobalStyle />
      <S.App data-theme='light'>
        <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
          <Sidebar isLoading={isLoading} setIsLoading={setIsLoading} />
          <S.Data>
            <TopMainPanel isLoading={isLoading} setIsLoading={setIsLoading} />
            <LowMainPanel isLoading={isLoading} setIsLoading={setIsLoading} />
          </S.Data>
        </WeatherContext.Provider>
      </S.App>
    </>
  );
};
