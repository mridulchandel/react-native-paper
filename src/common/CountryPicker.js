import React from 'react';
import {View, StyleSheet} from 'react-native';
import CountryPick, {DARK_THEME} from 'react-native-country-picker-modal';
import {Text, Avatar, useTheme} from 'react-native-paper';

import {useAppState} from '../contextStore/StateProvider';

function CountryPicker({countryDetail, visible, pickerHandler, showPicker}) {
  const [{themeColor}] = useAppState();
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <CountryPick
        theme={themeColor === 'dark' ? DARK_THEME : null}
        {...{
          countryCode: countryDetail.cca2,
          onSelect: (country) => pickerHandler(country),
          onClose: () => showPicker(false),
          withFilter: true,
          preferredCountries: ['IN', 'US', 'GB'],
        }}
        visible={visible}
      />
      <Text>+{countryDetail.callingCode}</Text>
      <Avatar.Icon
        size={36}
        icon="arrow-down-drop-circle-outline"
        style={{backgroundColor: colors.background, color: colors.text}}
      />
    </View>
  );
}

export default CountryPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
