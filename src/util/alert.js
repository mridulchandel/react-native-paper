import {Alert} from 'react-native';

export const alert = (title, body, cancelable = false, options) => {
  return Alert.alert(title, body, options, {cancelable});
};
