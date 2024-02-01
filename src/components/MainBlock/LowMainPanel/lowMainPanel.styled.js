import styled from 'styled-components';

export const DataDetails = styled.section`
  display: grid;
  grid-template-areas: 'today .' 'blow humidity' 'visibility atm';
  gap: 18px 80px;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1439px) {
    display: grid;
    grid-template-areas: 'today ' 'blow' 'humidity' 'visibility' 'atm';
    gap: 27px 0;
    justify-items: center;
    width: 50vw;
  }
`;

export const DataPanelForecast = styled.h2`
  color: var(--big-text);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 100%;
  text-align: center;
  grid-area: today;
`;

export const DataDetailsBlock = styled.div`
  width: 25vw;
  min-width: 320px;
  height: 180px;
  border-radius: 10px;
  background-color: var(--light-block);
  transition: background-color 0.5s ease;
  box-shadow: 0 8px 15px 0 rgb(0 0 0 / 5%);
  padding-top: 20px;
  padding-right: 25px;
  padding-left: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  animation-name: fade-in;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  box-sizing: border-box;
  grid-area: blow;
  box-sizing: border-box;
  padding-bottom: 12px;

  @media screen and (max-width: 375px) {
    text-align: center;
    min-width: 180px;
    display: flex;
    justify-content: space-around;
    padding: 10px;
  }
`;

export const TextMiddle = styled.p`
  color: var(--big-text);
  font-size: 1.125rem;
  font-weight: 400;
`;

export const TextLarge = styled.p`
  color: var(--big-text);
  font-size: 4rem;
  font-weight: 900;
  span {
    font-size: 2.25rem;
    font-weight: 500;
  }
  @media screen and (max-width: 375px) {
    font-size: 2.9rem;
  }
`;

export const DataWind = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 11px;
  align-items: center;
`;

export const DataWindDirection = styled.img`
  transform: ${(props) => `rotate(${props.$deg + 225}deg)`};
`;

export const DataDetailsBlockVis = styled(DataDetailsBlock)`
  grid-area: visibility;
  height: 162px;
  padding-bottom: 24px;
  box-sizing: border-box;
  grid-area: visibility;
  height: 162px;
  padding-bottom: 24px;
  box-sizing: border-box;
`;

export const DataDetailsBlockHum = styled(DataDetailsBlock)`
  grid-area: humidity;
  box-sizing: border-box;
  padding-bottom: 53px;
  @media screen and (max-width: 375px) {
    padding-bottom: 0;
  }
`;

export const HumidityScale = styled.div`
  grid-area: humidity;
  box-sizing: border-box;
  padding-bottom: 53px;
  display: flex;
  flex-direction: column;
  color: var(--big-text);
  font-size: 12px;
  font-weight: 300;
  row-gap: 2px;
  width: 100%;
`;

export const HumidityScaleMarkers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: var(--big-text);
  font-size: 12px;
  font-weight: 300;
`;

export const Markers = styled.div``;

export const HumidityScaleImagine = styled.div`
  width: 100%;
  height: 11px;
  border-radius: 10px;
  background-color: var(--scale-humidity);
`;

export const HumidityScaleIndicate = styled.div`
  background-color: var(--humidity-indicate);
  border-radius: 10px;
  height: 11px;
`;

export const HumidityScaleHundred = styled.div`
  text-align: right;
`;

export const DataDetailsBlockAtm = styled(DataDetailsBlock)`
  grid-area: atm;
  height: 162px;
  box-sizing: border-box;
  padding-bottom: 24px;
`;

export const TextLargePressure = styled(TextLarge)`
  span {
    font-size: 1.125rem;
    font-weight: 500;
  }
`;
