import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Card, Title, Paragraph, useTheme} from 'react-native-paper';
import {useDimensions} from '@react-native-community/hooks';

function CustomCard({title, message, source}) {
  const {colors} = useTheme();
  const {height} = useDimensions().window;
  return (
    <View
      style={[
        styles.containerStyle,
        {backgroundColor: colors.background, height: height * 0.75},
      ]}
    >
      {title && <Title>{title}</Title>}
      {source && (
        <Card.Cover
          source={source}
          resizeMode="contain"
          style={[styles.imageStyle, {backgroundColor: colors.background}]}
        />
      )}
      {message && <Paragraph>{message}</Paragraph>}
    </View>
  );
}

export default CustomCard;

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 200,
    height: 200,
  },
});
