import styled from 'styled-components';

export const LabelBtnSwitch = styled.label`
  position: relative;
  width: 64px;
  height: 32px;
  padding: 4px;
  border: 2px solid var(--shadow-text);
  border-radius: 20px;
  box-sizing: border-box;
  cursor: pointer;
`;

export const Input = styled.input`
  position: absolute;
  opacity: 0;
`;

export const Label = styled.label``;

export const SwitchBlock = styled.label`
  position: absolute;
  left: ${(props) => (props.$currentTheme === 'light' ? '5px' : '35px')};
  transition: left 0.5s ease;
  transform: ${(props) =>
    props.$currentTheme === 'light' ? 'rotate(0deg)' : 'rotate(360deg)'};
  transition-property: left, transform;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
`;

export const Indicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  color: var(--indicate);
  background-color: var(--bg-indicate);
  transition: background-color 0.5s ease;
  cursor: pointer;
`;
