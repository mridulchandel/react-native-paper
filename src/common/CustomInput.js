import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, useTheme, HelperText} from 'react-native-paper';

const CustomInput = ({style, onChange, inputKey, error, ...props}) => {
  const {colors} = useTheme();
  return (
    <>
      <TextInput
        {...props}
        error={error}
        style={[styles.input, {backgroundColor: colors.background}, style]}
        onChangeText={(text) => onChange(inputKey, text)}
      />
      <HelperText type="error" visible={error}>
        {error}
      </HelperText>
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    marginVertical: 5,
    marginHorizontal: 10,
    paddingHorizontal: 0,
  },
});
