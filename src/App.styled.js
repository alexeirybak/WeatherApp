import styled from 'styled-components';

export const App = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  @media screen and (max-width: 1439px) {
    flex-direction: row;
    height: 100vh;
  }
  @media screen and (max-width: 833px) {
    display: flex;
    flex-direction: column;
    height: auto;
    overflow-x: hidden;
  }
`;

export const Data = styled.main`
  box-sizing: border-box;
  width: 68vw;
  background-color: var(--light-text);
  transition: background-color 0.5s ease;
  padding: 44px 54px 44px 74px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1439px) {
    width: 60.5vw;
    padding: 63px 28px 83px 27px;
  }
  @media screen and (max-width: 833px) {
    box-sizing: border-box;
    width: 100vw;
    padding: 50px 60px 96px;
  }
`;
