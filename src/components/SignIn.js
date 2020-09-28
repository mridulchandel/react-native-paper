// import { auth } from "./firebase";
import React, {useState, useCallback} from 'react';
import {Pressable, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import {StyleSheet, ImageBackground} from 'react-native';

import CustomButton from '../common/CustomButton';
import CustomInput from '../common/CustomInput';
import ThemeWrapper from '../theme/ThemeWrapper';
import Header from '../common/Header';
import {useAppState} from '../contextStore/StateProvider';
import useBackButton from '../util/useBackButton';
import CountryPicker from '../common/CountryPicker';

function SignIn({navigation}) {
  useBackButton();
  const [{loadingData}, dispatch] = useAppState();

  const [isCountryPicker, setIsCountryPicker] = useState(false);
  const [countryDetail, setCountryDetail] = useState({
    callingCode: ['91'],
    cca2: 'IN',
    currency: ['INR'],
    flag: 'flag-in',
    name: 'India',
    region: 'Asia',
    subregion: 'Southern Asia',
  });

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [phoneConfirm, setPhoneConfirm] = useState(null);

  const loading = () => {
    // dispatch({
    //   type: 'SET_LOADING_DATA',
    //   data: true,
    // });
  };

  const handleFacebookSignIn = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    console.log(result, 'result');
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken
    );

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(facebookCredential)
      .then((user) => {
        console.log('navigating');
        loading();
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
      });
  };

  const handleGoogleSignIn = async () => {
    GoogleSignin.configure({
      webClientId:
        '765195782640-l25jj0c1ccuu6ilftn3sbhh890ho1amt.apps.googleusercontent.com',
    });
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        console.log('navigating');
        loading();
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
      });
  };

  const handlePhoneSignIn = async () => {
    if (phoneConfirm) {
      try {
        await phoneConfirm.confirm(code);
        loading();
      } catch (error) {
        console.log('Invalid code.');
      }
    } else {
      const confirmation = await auth().signInWithPhoneNumber(
        '+' + countryDetail.callingCode + phone
      );
      setPhoneConfirm(confirmation);
    }
  };

  const onPhoneChange = useCallback(
    (key, value) => {
      if (phoneConfirm) {
        setCode(value);
      } else {
        setPhone(value);
      }
    },
    [setPhone, setCode, phoneConfirm]
  );

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user != null) {
  //       console.log(user, "user");
  //     }

  //     // Do other things
  //   });
  // }, []);

  // const onSignIn = async () => {
  // try {
  //   await Facebook.initializeAsync("613847619215297");
  //   const {
  //     type,
  //     token,
  //     expires,
  //     permissions,
  //     declinedPermissions,
  //   } = await Facebook.logInWithReadPermissionsAsync({
  //     permissions: ["public_profile"],
  //   });
  //   if (type === "success") {
  //     console.log(token, "token");
  //     // Build Firebase credential with the Facebook access token.
  //     console.log(auth.FacebookAuthProvider, "credentials");
  //     const credential = auth.FacebookAuthProvider.credential(token);
  //     // Sign in with credential from the Facebook user.
  //     console.log(credential, "facebook");
  //     auth()
  //       .signInWithCredential(credential)
  //       .then((result) => console.log(result, "result"))
  //       .catch((error) => {
  //         // Handle Errors here.
  //         console.log(error.code, "errorsss");
  //         console.log(error.message, "errorsss meass");
  //       });
  //     console.log("Logged in!", `Hi ${credential}!`);
  //   } else {
  //     // type === 'cancel'
  //   }
  // } catch ({ message }) {
  //   console.log(`Facebook Login Error: ${message}`);
  // }
  // };

  const showPicker = (val) => {
    console.log('calling');
    setIsCountryPicker(val);
  };

  const countryPickerHandler = (country) => {
    setCountryDetail(country);
    setIsCountryPicker(false);
  };

  console.log(isCountryPicker, 'country picker');

  return (
    <>
      <Header title="Sign In" />
      <ImageBackground
        source={require('../assets/sign-in.jpg')}
        style={[styles.image]}
        resizeMode="stretch"
      >
        <ThemeWrapper styling={styles.card}>
          <CustomButton
            icon="facebook"
            text="Log In with Facebook"
            clicked={handleFacebookSignIn}
          />
          <CustomButton
            icon="google"
            text="Log In with Gmail"
            clicked={handleGoogleSignIn}
          />
          <View style={styles.mobileContainer}>
            {!phoneConfirm && (
              <Pressable onPress={() => showPicker(true)}>
                <CountryPicker
                  countryDetail={countryDetail}
                  visible={isCountryPicker}
                  pickerHandler={countryPickerHandler}
                  showPicker={showPicker}
                />
              </Pressable>
            )}
            <CustomInput
              label={phoneConfirm ? 'Confirm code' : 'Mobile No.'}
              value={phoneConfirm ? code : phone}
              onChange={onPhoneChange}
              inputKey={phoneConfirm ? 'code' : 'phone'}
              keyboardType="number-pad"
              maxLength={10}
              style={{flex: 1}}
            />
          </View>
          <CustomButton
            text={phoneConfirm ? 'Confirm code' : 'Log In with Mobile'}
            clicked={handlePhoneSignIn}
            disabled={phone.length < 10}
          />
        </ThemeWrapper>
      </ImageBackground>
    </>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  card: {
    width: '80%',
    paddingVertical: 20,
    borderRadius: 20,
    flex: 0,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  mobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});
