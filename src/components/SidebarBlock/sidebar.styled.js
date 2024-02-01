import styled, { css } from 'styled-components';
import cityArrow from './city-arrow.svg';

export const Loc = styled.div`
  position: relative;
  width: 32vw;
  background-image: url('/public/img/Cloud-background.png');
  background-blend-mode: difference;
  background-repeat: no-repeat;
  background-position-y: 30%;
  background-size: contain;
  background-color: var(--light-block);
  transition: background-color 0.5s ease;
  box-sizing: border-box;
  padding: 44px 44px 35px 41px;
  overflow: hidden;
  @media screen and (max-width: 1439px) {
    width: 39.5vw;
    padding: 53px 21px 35px;
    height: 100vh;
    min-height: 720px;
  }
  @media screen and (max-width: 833px) {
    width: 100vw;
    background-position: 0 center;
    overflow: hidden;
  }
  @media screen and (max-width: 375px) {
    padding: 0;
    overflow: auto;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    height: auto;
  }
`;

export const LocFront = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  transform: translate(0%);
  height: 100%;
  @media screen and (max-width: 833px) {
    padding: 40px 27px 0 27px;
  }
  @media screen and (max-width: 375px) {
    padding: 10px;
    width: 100%;
    padding-bottom: 30px;
  }
`;

export const LocFrontTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  row-gap: 10px;
  @media screen and (max-width: 375px) {
    flex-direction: column;
    width: 100%;
    margin-top: 30px;
  }
`;

export const LocFinder = styled.button`
  box-sizing: border-box;
  width: 180px;
  height: 50px;
  border-radius: 10px;
  border: 2px solid var(--shadow-text);
  background-color: var(--light-block);
  transition: background-color 0.5s ease;
  color: var(--big-text);
  font-size: 1.125rem;
  font-weight: 700;
  font-family: Rubik, sans-serif;
  cursor: pointer;
  @media screen and (max-width: 833px) {
    margin-bottom: 9px;
  }
`;

export const LocImg = styled.img`
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 833px) {
    margin-top: 0;
    margin-bottom: 0;
  }
  @media screen and (max-width: 375px) {
    width: 190px;
  }
`;

export const LocInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LocParamText = styled.p`
  font-size: 6rem;
  font-weight: 900;
  color: var(--big-text);
  text-align: center;
  span {
    font-size: 3.125rem;
    font-weight: 500;
  }
  @media screen and (max-width: 833px) {
    margin-top: -17px;
  }
  @media screen and (max-width: 375px) {
    font-size: 4rem;
    span {
      font-size: 2rem;
    }
  }
`;

export const LocPrecipitationText = styled.p`
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 100%;
  color: var(--big-text);
  padding-top: 17px;
  padding-bottom: 17px;
  text-align: center;
  @media screen and (max-width: 375px) {
    text-align: center;
    word-break: break-all;
  }
  @media screen and (max-width: 330px) {
    font-size: 1.6rem;
  }
`;

export const LocFeel = styled.p`
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--shadow-text);
  margin-bottom: 78px;
  text-align: center;
  @media screen and (max-width: 330px) {
    font-size: 1rem;
  }
`;

export const LocPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 35px;
  @media screen and (max-width: 1439px) {
    margin-bottom: 25px;
  }
  @media screen and (max-width: 330px) {
    flex-direction: column;
  }
`;

export const TextMiddleLoc = styled.p`
  color: var(--shadow-text);
  text-align: center;
  font-size: 1.125rem;
  font-weight: 400;
`;

export const LocIcon = styled.img`
  top: 15px;
  position: relative;
`;

export const LocAppeared = styled.div`
  display: flex;
  position: absolute;
  inset: 0;
  background-color: var(--light-block);
  box-sizing: border-box;
  padding: 53px 20px 35px;
  flex-direction: column;
  transform: translateX(-100%);
  transition: transform 0.5s ease-in-out;
  overflow: hidden;
  @media screen and (max-width: 833px) {
    padding: 40px 27px 0 27px;
  }
  @media screen and (max-width: 375px) {
    padding: 0;
    width: 100%;
  }

  ${(props) =>
    props.$isLocAppeared &&
    css`
      transform: translateX(0);
    `}
`;

export const LocCloser = styled.button`
  margin-bottom: 45px;
  display: flex;
  justify-content: flex-end;
  background-color: var(--light-block);
  transition: background-color 0.5s ease;
  border: none;
  width: 26px;
  align-self: flex-end;
  cursor: pointer;
  @media screen and (max-width: 1439px) {
    margin-bottom: 37px;
  }
  @media screen and (max-width: 375px) {
    margin-top: 30px;
    margin-bottom: 30px;
    width: 16px;
    align-self: center;
  }
`;

export const LocFind = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 1439px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

export const LocFindIcon = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 22px;
  @media screen and (max-width: 1439px) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 22px;
  }

  @media screen and (max-width: 375px) {
    column-gap: 15px;
    width: auto;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 2px solid var(--shadow-text);
  padding-left: 44px;
  padding-right: 12px;
  background-color: var(--light-block);
  transition: background-color 0.5s ease;
  color: var(--big-text);
  font-size: 1.125rem;
  font-weight: 700;
  font-family: Rubik, sans-serif;
  outline: none;

  &::placeholder {
    color: var(--big-text);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &[type='search']::-webkit-search-cancel-button {
    appearance: none;
    width: 17px;
    height: 16px;
    background: url('/public/img/reset.png');
    background-repeat: no-repeat;
    margin-right: 2px;
  }

  @media screen and (max-width: 375px) {
    width: 100%;
    padding-left: 35px;
    padding-right: 8px;
    &::placeholder {
      font-size: 0.9rem;
    }
  }
`;

export const LocSearchFinder = styled.button`
  box-sizing: border-box;
  width: 97px;
  padding: 0;
  cursor: pointer;
  height: 50px;
  border-radius: 10px;
  border: 2px solid var(--shadow-text);
  background-color: var(--light-block);
  transition: background-color 0.5s ease;
  color: var(--big-text);
  font-size: 1.125rem;
  font-weight: 700;
  font-family: Rubik, sans-serif;
  outline: none;
  @media screen and (max-width: 833px) {
    width: 100%;
  }
`;

export const FindIcon = styled.img`
  position: absolute;
  top: 16px;
  left: 16px;
  @media screen and (max-width: 833px) {
    left: 16px;
  }
  @media screen and (max-width: 375px) {
    left: 12px;
  }
`;

export const SearchNotRuInput = styled.p`
  color: var(--humidity-indicate);
  font-weight: 700;
  text-align: center;
`;

export const FindIconList = styled.div`
  width: 100%;
`;

export const CityList = styled.ul`
  margin-right: 20px;
`;

export const LocBtnCity = styled.li`
  width: 100%;
  height: 70px;
  font-family: Rubik, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  text-align: left;
  border: none;
  border-radius: 10px;
  color: var(--big-text);
  padding: 26px 63px 26px 30px;
  box-sizing: border-box;
  list-style: none;
  margin-bottom: 10px;
  word-break: break-all;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: var(--menu-city);
    background-image: url('${cityArrow}');
    background-repeat: no-repeat;
    background-position: right 33px center;
  }
  @media screen and (max-width: 1439px) {
    height: 70px;
  }
  @media screen and (max-width: 375px) {
    height: 60px;
    font-size: 1.25rem;
    padding: 10px 23px 10px 10px;
    margin-right: 10px;
    margin-left: 10px;
    &:hover {
      background-position: right 8px center;
    }
  }
`;
