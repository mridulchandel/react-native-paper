import React, {useState, useEffect} from 'react';
import {BottomNavigation, Text} from 'react-native-paper';

import UserRoute from './User.js';
import ProductRoute from './Products.js';
import {useAppState} from '../contextStore/StateProvider';
import useBackButton from '../util/useBackButton';
import {getAllFirestore} from '../util/firestore';

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
    getAllFirestore('Products').then((data) => {
      dispatch({
        type: 'ADD_PRODUCT_DATA',
        data,
      });
    });
  }, []);

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
