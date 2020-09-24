import React, {useState, useEffect} from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import UserRoute from './User.js';
import ProductRoute from './Products.js';
import CartRoute from './CartItems.js';
import {useAppState} from '../contextStore/StateProvider';
import useBackButton from '../util/useBackButton';
import {getAllFirestore} from '../util/firestore';

const Home = ({}) => {
  const [{uid}, dispatch] = useAppState();
  useBackButton();
  // For bottom navigator
  const [index, setIndex] = useState(0);

  const routes = [
    {key: 'products', title: 'Products', icon: 'album'},
    {key: 'cart', title: 'Cart', icon: 'cart'},
    {
      key: 'user',
      title: 'Profile',
      icon: 'account',
    },
  ];

  // fetch userDetail
  useEffect(() => {
    getAllFirestore('Products').then((data) => {
      dispatch({
        type: 'ADD_PRODUCT_DATA',
        data,
      });
    });

    const getCartItems = firestore()
      .collection(`Users/${uid}/Cart`)
      .onSnapshot((querySnapshot) => {
        // console.log('Total users: ', querySnapshot.size);
        const cartItems = [];
        querySnapshot.forEach((documentSnapshot) => {
          cartItems.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        dispatch({
          type: 'ADD_CART_DATA',
          data: cartItems,
        });
      });

    const getUserSnap = firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot((documentSnapshot) => {
        console.log(documentSnapshot.data(), 'snappy');
        // setUserInfo(documentSnapshot.data());
        // setUserData(documentSnapshot.data());
        dispatch({
          type: 'ADD_USER_DATA',
          data: documentSnapshot.data(),
        });
      });
    return () => {
      getUserSnap();
      getCartItems();
    };
  }, []);

  // Render different scenes for different tabs
  const renderScene = BottomNavigation.SceneMap({
    user: UserRoute,
    products: ProductRoute,
    cart: CartRoute,
  });

  return (
    <>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default Home;
