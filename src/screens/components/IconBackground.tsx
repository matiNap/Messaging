import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import palette from '_palette';

interface Props {
  size: number;
  color?: string | undefined;
}

const IconBackground = (props: Props) => {
  const { children, size, color } = props;
  const backgroundColor = color ? color : palette.grayscale.dark;
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size,
          backgroundColor,
        },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconBackground;
