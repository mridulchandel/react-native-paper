import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {Platform, StyleSheet} from 'react-native';

import {useAppState} from '../contextStore/StateProvider';
const Header = ({title, subtitle, leftIcon, handleLeftIcon}) => {
  const [{themeColor}, dispatch] = useAppState();

  const onToggleSwitch = () => {
    dispatch({
      type: 'TOOGLE_THEME',
    });
  };

  return (
    <Appbar.Header>
      {leftIcon ? (
        <Appbar.Action icon={leftIcon} onPress={handleLeftIcon} />
      ) : (
        <Appbar.BackAction onPress={() => {}} />
      )}
      <Appbar.Content
        title={title}
        subtitle={subtitle}
        style={styles.contentStyle}
      />
      <Appbar.Action
        icon={themeColor === 'light' ? 'octagram' : 'octagram-outline'}
        onPress={onToggleSwitch}
      />
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({
  contentStyle: {
    alignItems: 'center',
  },
});
