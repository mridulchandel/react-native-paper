import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

function useDrawer(iconName = 'hamburger') {
  const navigation = useNavigation();

  const handleDrawer = useCallback(() => {
    navigation.toggleDrawer();
  }, [navigation]);

  return {iconName, handleDrawer};
}

export default useDrawer;
