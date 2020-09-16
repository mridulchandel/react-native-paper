import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value, isObj = false) => {
  try {
    let transformedValue = value;
    if (isObj) {
      transformedValue = JSON.stringify(value);
    }
    return await AsyncStorage.setItem(key, transformedValue);
  } catch (e) {
    // saving error
    console.error(e);
  }
};

export const getData = async (key, isObj = false) => {
  try {
    let transformedValue = await AsyncStorage.getItem(key);
    if (isObj) {
      transformedValue =
        transformedValue != null ? JSON.parse(transformedValue) : null;
    }
    return transformedValue;
  } catch (e) {
    // error reading value
  }
};

export const removeValue = async (key) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
    console.error('Error while removing');
  }

  console.log('Done.');
};
