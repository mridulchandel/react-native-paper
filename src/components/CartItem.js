import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  Subheading,
  Paragraph,
  Text,
  Appbar,
  useTheme,
} from 'react-native-paper';

import CustomButton from '../common/CustomButton';
import {useAppState} from '../contextStore/StateProvider';
import {alert} from '../util/alert';
import {deleteFirestore} from '../util/firestore';
import {toastMsg} from '../util/toast';

function CartItem({id, title, image, description, price}) {
  const [{uid}] = useAppState();
  const {colors} = useTheme();

  const onDeleteItems = (cid) => {
    alert('Alert', 'Do you want to remove the item from the cart?', true, [
      {
        text: 'YES',
        onPress: () => {
          deleteFirestore(`Users/${uid}/Cart`, cid).then((data) => {
            toastMsg(data, 'Item removed');
          });
        },
      },
      {text: 'NO', onPress: () => console.log('NO Pressed')},
    ]);
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.accent}]}>
      <Appbar.Action
        style={styles.modalCross}
        color={colors.text}
        icon="alpha-x-circle-outline"
        onPress={() => onDeleteItems(id)}
      />
      <Image source={{uri: image}} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Subheading style={styles.title}>{title}</Subheading>
        <Paragraph>{description}</Paragraph>
        <Text style={styles.price}>₹ {price}</Text>
      </View>
      <CustomButton text="Place Order" clicked={() => {}} />
    </View>
  );
}

export default CartItem;

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
    elevation: 3,
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
  modalCross: {
    alignSelf: 'flex-end',
    margin: 0,
  },
});
