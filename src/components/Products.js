import React from 'react';
import {FlatList, Platform} from 'react-native';

import Header from '../common/Header';
import {useAppState} from '../contextStore/StateProvider';
import Product from './Product';
import CustomCard from '../common/CustomCard';
import useDrawer from '../util/useDrawer';

const Products = ({route}) => {
  const [{productData}] = useAppState();
  const {iconName, handleDrawer} = useDrawer();

  const renderItem = ({item}) => (
    <Product
      key={item.key}
      id={item.id}
      title={item.title}
      image={item.image}
      description={item.description}
      price={item.price}
    />
  );

  return (
    <>
      <Header
        title={route.title}
        leftIcon={iconName}
        handleLeftIcon={handleDrawer}
      />
      <FlatList
        data={productData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <CustomCard
            source={require('../assets/sad-face.png')}
            message="Nothing to show, please try again later"
          />
        }
      />
    </>
  );
};

export default Products;
