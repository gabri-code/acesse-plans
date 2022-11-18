import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const fonts = {
  heading: `Gilroy-SemiBold', sans-serif`,
  body: `'Gilroy-Regular', sans-serif`,
  'Gilroy-Regular': 'Gilroy-Regular',
  'Gilroy-Bold': 'Gilroy-Bold',
  'Gilroy-SemiBold': 'Gilroy-SemiBold',
  'Gilroy-Light': 'Gilroy-Light',
  'Gilroy-LightItalic': 'Gilroy-LightItalic',
  'Gilroy-Medium': 'Gilroy-Medium',
  'Gilroy-MediumItalic': 'Gilroy-MediumItalic',
  'Gilroy-RegularItalic': 'Gilroy-RegularItalic',
  'Gilroy-Thin': 'Gilroy-Thin',
};

const breakpoints = {
  sm: '576px',
  md: '811px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

export const theme = extendTheme({ colors, fonts, breakpoints });
