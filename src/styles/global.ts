import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @font-face {
    font-family: 'Poppins-Light';
    src: url('/fonts/Poppins-Light.ttf') format('truetype');
    font-style: normal;
    font-weight: 300;
    font-display: swap;
  }

  @font-face {
    font-family: 'Poppins-Regular';
    src: url('/fonts/Poppins-Regular.ttf') format('truetype');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: 'Poppins-Medium';
    src: url('/fonts/Poppins-Medium.ttf') format('truetype');
    font-style: normal;
    font-weight: 500;
    font-display: swap;
  }

  @font-face {
    font-family: 'Poppins-SemiBold';
    src: url('/fonts/Poppins-SemiBold.ttf') format('truetype');
    font-style: normal;
    font-weight: 600;
    font-display: swap;
  }

  @font-face {
    font-family: 'Poppins-Bold';
    src: url('/fonts/Poppins-Bold.ttf') format('truetype');
    font-style: normal;
    font-weight: 700;
    font-display: swap;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
