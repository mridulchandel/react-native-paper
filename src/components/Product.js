import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import CustomButton from '../common/CustomButton';

const Product = ({ title, image, description, price }) => {
  return (
    <View style={styles.container}>
      <View style={styles.productDetail}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={1}>
            {description}
          </Text>
          <Text style={styles.price}>₹ {price}</Text>
        </View>
      </View>
      <CustomButton text="Add To Cart" clicked={() => {}} />
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
  productDetail: {
    flexDirection: 'row',
  },
  image: {
    width: '20%',
    height: 100,
  },
  textContainer: {
    width: '78%',
    paddingHorizontal: 5,
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    width: '75%',
  },
  price: {
    fontWeight: 'bold',
    paddingTop: 5,
  },
});
