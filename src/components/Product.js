import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  Text,
  TouchableRipple,
  Appbar,
  useTheme,
  Subheading,
  Paragraph,
} from 'react-native-paper';

import CustomButton from '../common/CustomButton';
import CustomModal from '../common/CustomModal';
import {useAppState} from '../contextStore/StateProvider';
import {setFirestore} from '../util/firestore';
import {toastMsg} from '../util/toast';

const Product = ({id, title, image, description, price}) => {
  const [isProductDetail, setIsProductDetail] = useState(false);
  const [{uid}] = useAppState();

  const {colors} = useTheme();

  const onCloseModal = () => {
    setIsProductDetail(false);
  };

  // Adding to cart for particular user
  const addToCart = (pid) => {
    const data = {
      title,
      image,
      description,
      price,
    };
    // Firestore nesting
    setFirestore(`Users/${uid}/Cart`, pid, data).then((data) => {
      toastMsg(data, 'Added to Cart', true);
      onCloseModal();
    });
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
            <Subheading style={styles.title} numberOfLines={!isModal ? 1 : 0}>
              {title}
            </Subheading>
            <Paragraph numberOfLines={!isModal ? 1 : 0}>
              {description}
            </Paragraph>
            <Text style={styles.price}>₹ {price}</Text>
          </View>
        </View>
        <CustomButton text="Add To Cart" clicked={() => addToCart(id)} />
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
        style={[styles.container, {backgroundColor: colors.accent}]}
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
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    paddingHorizontal: 5,
  },
  title: {
    fontWeight: 'bold',
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
