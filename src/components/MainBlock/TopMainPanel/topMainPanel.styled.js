import styled from 'styled-components';

export const DataVidget = styled.section`
  display: grid;
  grid-template-areas:
    '. data_panel .'
    'arrow_widget_left data_carousel arrow_widget_right';
  grid-template-rows: 24px 143px;
  row-gap: 25px;
  column-gap: 28px;
  align-items: center;
  margin-bottom: 38px;
  justify-content: center;
  @media screen and (max-width: 1439px) {
    grid-template-areas: '. data_panel data_panel' 'arrow_widget_left data_carousel arrow_widget_right';
    column-gap: 13px;
    margin-bottom: 42px;
  }
  @media screen and (max-width: 833px) {
    grid-template-areas: 'data_panel' 'data_carousel';
    grid-template-rows: auto auto;
    row-gap: 33px;
    column-gap: 28px;
    align-items: center;
    margin-bottom: 59px;
    justify-content: center;
  }
`;

export const DataPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 24px;
  grid-area: data_panel;
  @media screen and (max-width: 833px) {
    flex-direction: column;
    row-gap: 30px;
    grid-area: data_panel;
  }
`;

export const DataPanelForecast = styled.h1`
  color: var(--big-text);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 100%;
`;

export const DataPanelNav = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 16px;
`;

export const WeekButton = styled.button`
  grid-area: week_button;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 100%;
  background-color: var(--light-text);
  transition:
    background-color 0.5s ease 0s,
    color 0.5s ease 0s;
  padding-bottom: 3px;
  box-sizing: border-box;
  border: 3px solid transparent;
  cursor: pointer;

  color: ${(props) =>
    props.$isWeek ? 'var(--shadow-text)' : 'var(--big-text)'};
  border-bottom: ${(props) =>
    props.$isWeek ? 'none' : '3px solid var(--big-text)'};

  &:hover {
    transition:
      background-color 0.5s ease 0s,
      border-bottom 0.5s ease 0s,
      color 0.5s ease 0s;
    border-bottom: 3px solid var(--big-text);
    color: var(--big-text);
  }
`;

export const HoursButton = styled(WeekButton)`
  grid-area: hours_button;
  color: ${(props) =>
    props.$isWeek ? 'var(--shadow-text)' : 'var(--big-text)'};
  border-bottom: ${(props) =>
    props.$isWeek ? 'none' : '3px solid var(--big-text)'};
`;
