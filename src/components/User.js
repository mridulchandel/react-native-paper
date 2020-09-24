import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Platform, Pressable} from 'react-native';
import {Avatar, useTheme, Text, Appbar} from 'react-native-paper';
import {isEmpty} from 'lodash';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

import Header from '../common/Header';
import CustomModal from '../common/CustomModal';
import CustomButton from '../common/CustomButton';
import CustomInput from '../common/CustomInput';
import {useAppState} from '../contextStore/StateProvider';
import {updateFirestore} from '../util/firestore';
import useDrawer from '../util/useDrawer';

const User = ({route}) => {
  // Getting userDetail from store
  const [{uid, userData}] = useAppState();
  const {iconName, handleDrawer} = useDrawer();

  // Setting local userDetail for manipulation
  const [userInfo, setUserInfo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {colors} = useTheme();
  const {name, email, phone, photoUrl} = userData;

  // Setting local userDetail initially from store
  useEffect(() => {
    setUserInfo(userData);
  }, [userData, setUserInfo]);

  // For editing local userDetail
  const editUserInfo = useCallback(
    (key, value) => {
      const updateUserInfo = {...userInfo};
      updateUserInfo[key] = value;
      if (isEmpty(value.trim())) {
        updateUserInfo[key + 'Error'] = 'Invalid Input';
      } else {
        updateUserInfo[key + 'Error'] = '';
      }
      setUserInfo(updateUserInfo);
    },
    [userInfo, setUserInfo]
  );

  // Saving edited data after validation
  const onSaveUserInfo = useCallback(() => {
    const {name, phone, email} = userInfo;
    updateFirestore('Users', uid, {name, phone, email}).then((data) => {
      console.log(data, 'submitted');
    });
  }, [userInfo, updateFirestore, uid]);

  //  Rendering user detail
  const renderUserDetails = (label, value) => {
    return value?.trim() ? (
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>{label}: </Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    ) : null;
  };

  // Resizing image
  const imageResizing = (imageUri) => {
    let newWidth = 200;
    let newHeight = 200;
    let compressFormat = 'PNG';
    let quality = 100;
    let rotation = 0;
    let outputPath = null;
    ImageResizer.createResizedImage(
      imageUri,
      newWidth,
      newHeight,
      compressFormat,
      quality,
      rotation,
      outputPath
    )
      .then(async (response) => {
        //resized image uri
        let uri = response.uri;

        //to resolve file path issue on different platforms
        let uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        // create bucket storage reference to not yet existing image
        const reference = storage().ref(`profile-picture/${uid}.png`);

        // uploads file
        const task = reference.putFile(uploadUri);
        // task.on('state_changed', (taskSnapshot) => {
        //   console.log(
        //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
        //   );
        // });

        task.then(() => {
          console.log('Image uploaded to the bucket!');
          reference.getDownloadURL().then((photoUrl) => {
            updateFirestore('Users', uid, {photoUrl}).then((data) => {
              console.log(data, 'photoupdated');
            });
          });
        });
      })
      .catch((err) => {
        console.log('image resizing error => ', err);
      });
  };

  const onProfileUploading = async () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // Picking image from the device
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        imageResizing(response.uri);
      }
    });
  };

  // For saving data on clicking save button
  const onSaveModal = () => {
    onSaveUserInfo();
    setIsModalVisible(false);
  };

  // For closing modal on clicking cross icon
  const onCloseModal = () => {
    setIsModalVisible(false);
    setUserInfo(userData);
  };

  // For rendering modal
  const renderModal = () => {
    const {name, email, phone, nameError, emailError, phoneError} = userInfo;
    return (
      <CustomModal
        visible={isModalVisible}
        containerStyle={styles.modalContainer}
      >
        <Appbar.Action
          style={styles.modalCross}
          color={colors.text}
          icon="alpha-x-circle-outline"
          onPress={onCloseModal}
        />
        <CustomInput
          label="Name"
          value={name}
          onChange={editUserInfo}
          inputKey="name"
          error={nameError}
        />
        <CustomInput
          label="Email"
          value={email}
          onChange={editUserInfo}
          inputKey="email"
          error={emailError}
          keyboardType="email-address"
        />
        <CustomInput
          label="Contact"
          value={phone}
          onChange={editUserInfo}
          inputKey="phone"
          error={phoneError}
          keyboardType="number-pad"
        />
        <CustomButton
          text="Save"
          clicked={onSaveModal}
          disabled={nameError || emailError || phoneError}
        />
      </CustomModal>
    );
  };

  return (
    <>
      <Header
        title={name ? name.split(' ')[0] : 'User'}
        leftIcon={iconName}
        handleLeftIcon={handleDrawer}
      />
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Pressable onPress={onProfileUploading}>
            <Avatar.Image
              source={{
                // uri: photoUrl,
                uri: photoUrl
                  ? photoUrl
                  : 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png',
              }}
            />
          </Pressable>
          <View>
            {renderUserDetails('Name', name)}
            {renderUserDetails('Email', email)}
            {renderUserDetails('Contact', phone)}
          </View>
        </View>
        <CustomButton
          text="Edit User Details"
          clicked={() => setIsModalVisible(true)}
        />
      </View>
      {renderModal()}
    </>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
  },
  detailsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    width: '100%',
  },
  label: {
    width: '22%',
  },
  value: {
    width: '70%',
  },
  modalContainer: {
    borderRadius: 10,
  },
  modalCross: {
    alignSelf: 'flex-end',
  },
});
