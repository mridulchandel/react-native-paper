import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

function ThemeWrapper({children, styling}) {
  const {colors} = useTheme();

  return (
    <View
      style={[
        {backgroundColor: colors.background},
        styles.container,
        {...styling},
      ]}
    >
      {children}
    </View>
  );
}

export default ThemeWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
