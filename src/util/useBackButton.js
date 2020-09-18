import {useCallback} from 'react';
import {BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {toast} from './toast';

function useBackButton() {
  let backPressed = 0;

  const hardwareBackPressCustom = useCallback(() => {
    // To show a toast when exiting
    if (backPressed > 0) {
      BackHandler.exitApp();
    } else {
      backPressed = 1;
      toast('Press Again to exit');
      setTimeout(() => {
        backPressed = 0;
      }, 4000);
      return true;
    }
  }, []);

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPressCustom);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        hardwareBackPressCustom
      );
    };
  }, []);
}

export default useBackButton;
