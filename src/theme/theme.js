import {DefaultTheme, DarkTheme} from 'react-native-paper';

export const theme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#228922',
      accent: 'yellow',
      // text: "#228922"
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#333333',
      accent: '#5b6987',
      surface: '#333333',
      background: '#212121',
      text: '#ffffff',
    },
  },
};
