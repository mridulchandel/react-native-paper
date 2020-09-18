import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Text, TouchableRipple, Appbar, useTheme} from 'react-native-paper';

import CustomButton from '../common/CustomButton';
import CustomModal from '../common/CustomModal';

const Product = ({title, image, description, price}) => {
  const [isProductDetail, setIsProductDetail] = useState(false);

  const {colors} = useTheme();

  const onCloseModal = () => {
    setIsProductDetail(false);
  };

  const renderProduct = (isModal) => {
    return (
      <View>
        <Image
          source={{uri: image}}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.productDetail}>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text
              style={!isModal && styles.description}
              numberOfLines={!isModal ? 1 : 0}
            >
              {description}
            </Text>
            <Text style={styles.price}>₹ {price}</Text>
          </View>
        </View>
        <CustomButton text="Add To Cart" clicked={() => {}} />
      </View>
    );
  };

  const renderProductDetail = () => {
    return (
      <CustomModal
        visible={isProductDetail}
        containerStyle={styles.modalContainer}
      >
        <Appbar.Action
          style={styles.modalCross}
          color={colors.text}
          icon="alpha-x-circle-outline"
          onPress={onCloseModal}
        />
        {renderProduct(true)}
      </CustomModal>
    );
  };
  return (
    <>
      <TouchableRipple
        style={styles.container}
        onPress={() => {
          setIsProductDetail(true);
        }}
      >
        {renderProduct()}
      </TouchableRipple>
      {renderProductDetail()}
    </>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flex: 0.5,
  },
  productDetail: {
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: 100,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    paddingHorizontal: 10,
  },
  price: {
    fontWeight: 'bold',
    paddingTop: 5,
  },
  modalContainer: {
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  modalCross: {
    alignSelf: 'flex-end',
  },
});
