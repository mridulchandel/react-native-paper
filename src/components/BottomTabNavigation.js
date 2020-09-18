import React, {useState, useEffect} from 'react';
import {BottomNavigation, Text} from 'react-native-paper';

import UserRoute from './User.js';
import ProductRoute from './Products.js';
import {useAppState} from '../contextStore/StateProvider';
import useBackButton from '../util/useBackButton';

const RecentsRoute = () => <Text>Recents</Text>;

const BotttomTabNavigation = ({}) => {
  const [{}, dispatch] = useAppState();
  useBackButton();
  // For bottom navigator
  const [index, setIndex] = useState(0);

  const routes = [
    {
      key: 'user',
      title: 'User',
      icon: 'account',
    },
    {key: 'products', title: 'Products', icon: 'album'},
    {key: 'recents', title: 'Recents', icon: 'history'},
  ];

  // fetch userDetail
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users/1'),
          fetch('https://fakestoreapi.com/products?limit=10'),
        ]);
        const data1 = await response[0].json();
        const data2 = await response[1].json();
        const userErrorInfo = {
          ...data1,
          nameError: '',
          emailError: '',
          phoneError: '',
        };
        // dispatch({
        //   type: 'ADD_USER_DATA',
        //   data: userErrorInfo,
        // });
        dispatch({
          type: 'ADD_PRODUCT_DATA',
          data: data2.map((data) => {
            return {...data, id: data.id.toString()};
          }),
        });
      } catch (err) {
        console.error(err);
      }
      dispatch({
        type: 'SET_LOADING_DATA',
        data: false,
      });
    }
    fetchData();
  }, [dispatch]);

  // Render different scenes for different tabs
  const renderScene = BottomNavigation.SceneMap({
    user: UserRoute,
    products: ProductRoute,
    recents: RecentsRoute,
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

export default BotttomTabNavigation;
