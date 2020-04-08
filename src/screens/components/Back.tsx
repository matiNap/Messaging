import React, { CSSProperties } from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Touchable from './Touchable';
import palette from '_palette';
import { useNavigation } from '@react-navigation/native';

interface Props {
  onPress?: Function;
  style?: CSSProperties;
}

const Back = (props: Props) => {
  const { onPress, style } = props;
  const navigation = useNavigation();
  return (
    <Touchable
      style={style}
      onPress={() => {
        if (!onPress) navigation.goBack();
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
    fontSize: 38,
    padding: 2,
  },
});

export default Back;
