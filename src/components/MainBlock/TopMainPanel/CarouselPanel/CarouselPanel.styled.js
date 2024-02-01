import styled from 'styled-components';

export const DataTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 13px;
  width: 100px;
  min-height: 143px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: var(--light-block);
  transition: background-color 0.5s ease;
  position: relative;
  animation-name: fade-in;
  animation-duration: 1s;
  animation-fill-mode: forwards;

  @keyframes fade-in {
    0% {
      opacity: 0.5;
      transform: scale(0.9);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media screen and (max-width: 220px) {
    width: 80px;
    padding: 9px;
    text-align: center;
  }
`;

export const TextItem = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 16px;
  color: var(--big-text);
  text-align: center;
`;

export const TextItemNight = styled(TextItem)`
  color: var(--temp-night);
`;

export const Sky = styled.img`
  top: 18%;
  position: absolute;
`;

export const DataTemperature = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 18px;
`;

export const ArrowBtnLeft = styled.button`
  grid-area: arrow_widget_left;
  border: none;
  background-color: var(--light-text);
  transition: background-color 0.5s ease 0s;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media screen and (max-width: 833px) {
    display: none;
  }
`;

export const ArrowBtnRight = styled(ArrowBtnLeft)`
  grid-area: arrow_widget_right;
  @media screen and (max-width: 833px) {
    display: none;
  }
`;

export const DataCarousel = styled.ul`
  display: flex;
  flex-direction: row;
  column-gap: 24px;
  list-style-type: none;
  grid-area: data_carousel;
  @media screen and (max-width: 833px) {
    gap: 55px;
    justify-content: space-between;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }
  @media screen and (max-width: 375px) {
    gap: 25px;
  }
`;

export const DataCarouselWeek = styled(DataCarousel)`
  grid-area: data_carousel;
`;
