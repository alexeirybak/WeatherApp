import styled, { keyframes } from 'styled-components';

const ldsEllipsisAnimation1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const ldsEllipsisAnimation2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const ldsEllipsisAnimation3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const LoaderContainer = styled.div`
  margin: 20px;
  text-align: center;
`;

const Ellipsis = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const EllipsisDot = styled.div`
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--big-text);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);

  &:nth-child(1) {
    left: 8px;
    animation: ${ldsEllipsisAnimation1} 0.6s infinite;
  }

  &:nth-child(2) {
    left: 8px;
    animation: ${ldsEllipsisAnimation2} 0.6s infinite;
  }

  &:nth-child(3) {
    left: 32px;
    animation: ${ldsEllipsisAnimation2} 0.6s infinite;
  }

  &:nth-child(4) {
    left: 56px;
    animation: ${ldsEllipsisAnimation3} 0.6s infinite;
  }
`;

export const Loader = () => {
  return (
    <LoaderContainer>
      <Ellipsis>
        <EllipsisDot />
        <EllipsisDot />
        <EllipsisDot />
        <EllipsisDot />
      </Ellipsis>
    </LoaderContainer>
  );
};
