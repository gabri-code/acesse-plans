import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Gilroy-Thin';
  src: url('/fonts/Gilroy-Thin.ttf') format('truetype');
  font-style: normal;
  font-weight: 100;
  font-display: swap;
}

@font-face {
  font-family: 'Gilroy-Light';
  src: url('/fonts/Gilroy-Light.ttf') format('truetype');
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: 'Gilroy-Regular';
  src: url('/fonts/Gilroy-Regular.ttf') format('truetype');
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'Gilroy-Medium';
  src: url('/fonts/Gilroy-Medium.ttf') format('truetype');
  font-style: normal;
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: 'Gilroy-SemiBold';
  src: url('/fonts/Gilroy-SemiBold.ttf') format('truetype');
  font-style: normal;
  font-weight: 600;
  font-display: swap;
}

@font-face {
  font-family: 'Gilroy-Bold';
  src: url('/fonts/Gilroy-Bold.ttf') format('truetype');
  font-style: normal;
  font-weight: 700;
  font-display: swap;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Gilroy-Regular', sans-serif;
}

body,
html {
  height: 100%;
  font-family: 'Gilroy-Regular', sans-serif;
}

`;
