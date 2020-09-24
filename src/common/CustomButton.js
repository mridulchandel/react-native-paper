import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, TouchableRipple, Button} from 'react-native-paper';

const CustomButton = ({icon, text, clicked, disabled}) => {
  const colors = useTheme();
  return (
    <View
      style={[styles.buttonContainer, {backgroundColor: colors.background}]}
    >
      <TouchableRipple rippleColor={colors.primary} useNativeDriver={false}>
        <Button
          icon={icon}
          style={styles.button}
          mode="contained"
          onPress={clicked}
          disabled={disabled}
          useNativeDriver={false}
        >
          {text}
        </Button>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default CustomButton;
