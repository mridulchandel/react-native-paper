import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme, TouchableRipple, Button } from 'react-native-paper'

const CustomButton = ({ text, clicked, disabled }) => {
  const colors = useTheme()
  return (
    <View
      style={[styles.buttonContainer, { backgroundColor: colors.background }]}
    >
      <TouchableRipple rippleColor={colors.primary} useNativeDriver={false}>
        <Button
          mode="contained"
          onPress={clicked}
          disabled={disabled}
          useNativeDriver={false}
        >
          {text}
        </Button>
      </TouchableRipple>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
})

export default CustomButton
