import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

import Navigator from '../Navigation/Navigator';
import {useAppState} from '../contextStore/StateProvider';
import {theme} from '../theme/theme';

export default function Paper() {
  const [{themeColor}] = useAppState();
  const currentTheme = theme[themeColor];

  return (
    <PaperProvider theme={currentTheme}>
      <NavigationContainer>
        <StatusBar backgroundColor={currentTheme.colors.primary} />
        <Navigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
