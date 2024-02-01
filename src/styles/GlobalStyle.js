import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

body {
  font-family: Rubik, sans-serif;
  font-style: normal;
  line-height: normal;
}

:root {
  --shadow-text: #acacac;
  --humidity-indicate: #ec6e4d;
}

:root[data-theme='light'] {
  --light-text: #f1f1f1;
  --big-text: #48484a;
  --light-block: #fff;
  --temp-night: #d3d3d3;
  --indicate: #e6e6e6;
  --bg-indicate: #48484a;
  --menu-city: #e6e6e6;
  --scale-humidity: #d3d3d3;
}

:root[data-theme='dark'] {
  --light-text: #100e1c;
  --big-text: #e6e6e6;
  --light-block: #212331;
  --temp-night: #6d6d6d;
  --indicate: #212331;
  --bg-indicate: #ec6e4d;
  --menu-city: #100e1c;
  --scale-humidity: #e6e6e6;
}`;
