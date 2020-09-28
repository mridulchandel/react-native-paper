import React from 'react';
import {FlatList} from 'react-native';

import Header from '../common/Header';
import {useAppState} from '../contextStore/StateProvider';
import CustomCard from '../common/CustomCard';
import CartItem from './CartItem';
import useDrawer from '../util/useDrawer';

function CartItems() {
  const [{cartData}] = useAppState();

  const {iconName, handleDrawer} = useDrawer();

  const renderItem = ({item}) => (
    <CartItem
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
      <Header title="Cart" leftIcon={iconName} handleLeftIcon={handleDrawer} />
      <FlatList
        data={cartData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <CustomCard
            source={require('../assets/sad-face.png')}
            message="Nothing to show, Cart is Empty"
          />
        }
      />
    </>
  );
}

export default CartItems;
