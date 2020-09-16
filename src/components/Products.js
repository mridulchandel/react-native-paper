import React from 'react';
import { FlatList } from 'react-native';
import { isEmpty } from 'lodash';

import Header from '../common/Header';
import { useAppState } from '../contextStore/StateProvider';
import Product from './Product';

const Products = ({ route }) => {
  const [{ productData }, dispatch] = useAppState();
  const renderItem = ({ item }) => (
    <Product
      title={item.title}
      image={item.image}
      description={item.description}
      price={item.price}
    />
  );

  return (
    <>
      <Header title={route.title} />
      {!isEmpty(productData) && (
        <FlatList
          data={productData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  );
};

export default Products;
