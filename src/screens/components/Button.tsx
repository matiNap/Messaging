import React, { CSSProperties } from 'react';
import { Text, View } from 'native-base';
import { StyleSheet, GestureResponderEvent } from 'react-native';
import metrics from '_metrics';
import palette from '_palette';
import typography from '_typography';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Props {
  style: CSSProperties;
  buttonStyle: CSSProperties;
  secondary: boolean;
  onPress(event: GestureResponderEvent): void;
  title: string;
}

const Button = (props: Props) => {
  const { style, secondary, onPress, title, buttonStyle } = props;
  const backgroundColor = secondary
    ? palette.secondary
    : palette.primary;
  const color = secondary ? palette.primary : palette.secondary;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, { backgroundColor }, style]}>
        <Text style={[styles.text, { color }, buttonStyle]}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: metrics.borderRadius.big,
    backgroundColor: palette.primary,
    padding: metrics.padding.normal,
  },
  text: {
    color: palette.text.secondary,
    fontSize: typography.fontSize.normal,
    alignSelf: 'center',
  },
});

export default Button;
