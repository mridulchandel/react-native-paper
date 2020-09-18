import React from 'react';
import {FlatList, Platform} from 'react-native';

import Header from '../common/Header';
import {useAppState} from '../contextStore/StateProvider';
import Product from './Product';
import CustomCard from '../common/CustomCard';

const Products = ({route}) => {
  const [{productData}, dispatch] = useAppState();

  const renderItem = ({item}) => (
    <Product
      key={item.key}
      title={item.title}
      image={item.image}
      description={item.description}
      price={item.price}
    />
  );

  return (
    <>
      <Header title={route.title} />
      <FlatList
        data={productData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
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
