import React, {useReducer, useCallback, useEffect} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

import Header from '../common/Header';
import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import ThemeWrapper from '../theme/ThemeWrapper';
import {useAppState} from '../contextStore/StateProvider';
import {setFirestore} from '../util/firestore';
import useBackButton from '../util/useBackButton';
import {isEmail, isEmpty, isPhone} from '../util/validation';

const initialState = {
  name: '',
  nameError: `Name can't be empty`,
  email: '',
  emailError: `Email can't be empty`,
  phone: '',
  phoneError: `Contact can't be empty`,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.data,
        nameError: action.error,
      };
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.data,
        emailError: action.error,
      };
    case 'SET_PHONE':
      return {
        ...state,
        phone: action.data,
        phoneError: action.error,
      };
    default:
      return state;
  }
};

function UserDetails({navigation, route}) {
  const [
    {name, nameError, email, emailError, phone, phoneError},
    dispatch,
  ] = useReducer(reducer, initialState);

  useBackButton();

  const [{uid}, dispatchAppState] = useAppState();

  // Getting user details via params
  useEffect(() => {
    console.log(
      route.params?.name && route.params?.email && route.params?.phone
    );
    if (route.params?.name) {
      editUserInfo('name', route.params?.name);
    }
    if (route.params?.email) {
      editUserInfo('email', route.params?.email);
    }
    if (route.params?.phone) {
      editUserInfo('phone', route.params?.phone);
    }
  }, [route.params]);

  const editUserInfo = useCallback(
    (key, value) => {
      let type = 'SET_' + key.toUpperCase();
      const data = value;
      let error = '';

      if (isEmpty(value)) {
        error = `${key.charAt(0).toUpperCase() + key.slice(1)} can't be empty`;
      } else if (key === 'email') {
        if (!isEmail(value)) {
          error = `Please enter a valid email`;
        }
      } else if (key === 'phone') {
        if (!isPhone(value)) {
          error = `Please enter a valid Phone`;
        }
      }

      // if (key === 'name') {
      //   type = 'SET_NAME';
      //   if (isEmpty(data)) {
      //     error = "Name can't be empty";
      //   }
      // } else if (key === 'email') {
      //   type = 'SET_EMAIL';
      //   if (isEmpty(data)) {
      //     error = "Email can't be empty";
      //   }
      // } else if (key === 'phone') {
      //   type = 'SET_PHONE';
      //   if (isEmpty(data)) {
      //     error = "Phone can't be empty";
      //   }
      // }
      dispatch({
        type,
        data,
        error,
      });
    },
    [dispatch]
  );

  const onSaveModal = () => {
    const photoUrl = route.params?.photoUrl;
    setFirestore('Users', uid, {name, phone, email, photoUrl}).then((data) => {
      console.log(data, 'submitted');
    });
    navigation.navigate('Sidebar');
  };

  return (
    <>
      <Header title="User Details" />
      <ImageBackground
        source={require('../assets/sign-in.jpg')}
        style={[styles.image]}
        resizeMode="stretch"
      >
        <ThemeWrapper styling={styles.card}>
          <CustomInput
            label="Name"
            value={name}
            onChange={editUserInfo}
            inputKey="name"
            error={nameError}
            autoFocus
            autoCapitalize="words"
          />
          <CustomInput
            label="Email"
            value={email}
            onChange={editUserInfo}
            inputKey="email"
            error={emailError}
            keyboardType="email-address"
            autoCompleteType="off"
          />
          <CustomInput
            label="Contact"
            value={phone}
            onChange={editUserInfo}
            inputKey="phone"
            error={phoneError}
            keyboardType="phone-pad"
            maxLength={10}
          />
          <CustomButton
            text="Save"
            clicked={onSaveModal}
            disabled={nameError || emailError || phoneError}
          />
        </ThemeWrapper>
      </ImageBackground>
    </>
  );
}

export default UserDetails;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    width: '80%',
    paddingVertical: 20,
    borderRadius: 20,
    flex: 0,
  },
});
