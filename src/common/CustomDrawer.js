import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, Text, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import CustomButton from './CustomButton';
import {useAppState} from '../contextStore/StateProvider';

function CustomDrawer(props) {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [{userData}] = useAppState();

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.popToTop();
      });
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.user, {borderColor: colors.primary}]}>
        <Avatar.Image
          source={{
            // uri: photoUrl,
            uri: userData.photoUrl
              ? userData.photoUrl
              : 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png',
          }}
        />
        <Text style={styles.userName}>{userData.name}</Text>
      </View>
      <CustomButton text="Sign Out" clicked={signOut} />
    </View>
  );
}

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  userName: {
    paddingLeft: 10,
    fontSize: 18,
  },
});
