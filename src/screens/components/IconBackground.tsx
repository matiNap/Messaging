import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import palette from '_palette';

interface Props {
  size: number;
}

const IconBackground = (props: Props) => {
  const { children, size } = props;
  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.grayscale.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconBackground;
