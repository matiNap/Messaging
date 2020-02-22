import React, { CSSProperties } from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Touchable from './Touchable';
import palette from '_palette';
import { withNavigation } from 'react-navigation';

interface Props {
  onPress?: Function;
  style?: CSSProperties;
}

const Back = (props: Props) => {
  const { onPress, style } = props;
  return (
    <Touchable
      onPress={() => {
        if (!onPress) props.navigation.goBack();
        else onPress();
      }}
    >
      <Ionicons name="ios-arrow-back" style={[styles.icon, style]} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: palette.text.primary,
    fontSize: 35,
  },
});

export default withNavigation(Back);
