import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, Text, Avatar, Title, Paragraph} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import CustomButton from './CustomButton';
import {useAppState} from '../contextStore/StateProvider';
import ThemeWrapper from '../theme/ThemeWrapper';

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
    <ThemeWrapper styling={styles.container}>
      <View style={[styles.user, {borderColor: colors.accent}]}>
        <Avatar.Image
          source={{
            // uri: photoUrl,
            uri: userData.photoUrl
              ? userData.photoUrl
              : 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png',
          }}
        />
        <View style={styles.userName}>
          <Title>{userData.name}</Title>
          <Paragraph>{userData.email}</Paragraph>
        </View>
      </View>
      <CustomButton text="Sign Out" clicked={signOut} />
    </ThemeWrapper>
  );
}

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
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
    maxWidth: '80%',
  },
});
