import { useState } from 'react';
import { CarouselPanel } from './CarouselPanel/CarouselPanel';
import * as S from './topMainPanel.styled';

export const TopMainPanel = ({ isLoading, setIsloading }) => {
  const [isWeek, setIsWeek] = useState(true);

  return (
    <S.DataVidget>
      <S.DataPanel>
        <S.DataPanelForecast>Прогноз</S.DataPanelForecast>
        <S.DataPanelNav>
          <S.WeekButton
            id='week'
            $isWeek={isWeek}
            onClick={() => setIsWeek(false)}
          >
            на неделю
          </S.WeekButton>
          <S.HoursButton
            id='hours'
            $isWeek={!isWeek}
            onClick={() => setIsWeek(true)}
          >
            почасовой
          </S.HoursButton>
        </S.DataPanelNav>
      </S.DataPanel>
      <CarouselPanel
        isWeek={isWeek}
        isLoading={isLoading}
        setIsLoading={setIsloading}
      />
    </S.DataVidget>
  );
};
