export const ArrowRight = ({ isNextButtonHoursDisabled }) => {
  return (
    <svg
      width='38'
      height='38'
      viewBox='0 0 38 38'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{
        cursor: 'pointer',
        circle: {
          fill: isNextButtonHoursDisabled ? 'var(--light-block)' : 'white',
          opacity: isNextButtonHoursDisabled ? 0.3 : 1,
        },
        path: {
          stroke: isNextButtonHoursDisabled ? '#ACACAC' : 'black',
          opacity: isNextButtonHoursDisabled ? 0.3 : 1,
        },
      }}
    >
      <circle cx='19' cy='19' r='19' fill='white' />
      <path
        d='M15 13.5L24.1265 19.1497C24.758 19.5407 24.758 20.4593 24.1265 20.8503L15 26.5'
        stroke='#ACACAC'
        strokeWidth='3'
      />
    </svg>
  );
};
