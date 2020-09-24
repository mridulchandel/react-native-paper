import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {isEmpty} from 'lodash';
import SplashScreen from 'react-native-splash-screen';

import CustomModal from '../common/CustomModal';
import ThemeWrapper from '../theme/ThemeWrapper';
import {useAppState} from '../contextStore/StateProvider';
import {getFirestore} from '../util/firestore';

function InitialLoader({navigation}) {
  const [{loadingData}, dispatch] = useAppState();

  // For checking whether loggedin or not
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      console.log(user, 'user');

      if (!isEmpty(user)) {
        dispatch({
          type: 'SET_UID',
          data: user.uid,
        });

        getFirestore('Users', user.uid).then((data) => {
          if (isEmpty(data)) {
            const name = user.displayName;
            const email = user.email;
            const phone = user.phoneNumber;
            const photoUrl = user.photoURL;
            navigation.navigate('UserDetail', {
              name,
              email,
              phone,
              photoUrl,
            });
          } else {
            navigation.navigate('Sidebar');
          }
          SplashScreen.hide();
        });
      } else {
        navigation.navigate('SignIn');
        dispatch({
          type: 'SET_UID',
          data: '',
        });
        SplashScreen.hide();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <ThemeWrapper>
      <CustomModal visible={loadingData} containerStyle={styles.container}>
        <ActivityIndicator animating={true} color="#228922" />
        <Text>Loading Data</Text>
      </CustomModal>
    </ThemeWrapper>
  );
}

export default InitialLoader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
});
