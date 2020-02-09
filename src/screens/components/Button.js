import React from "react";
import { Text, View } from "native-base";
import { StyleSheet } from "react-native";
import metrics from "_metrics";
import palette from "_palette";
import typography from "_typography";

const Button = props => {
  const { style, secondary } = props;
  const backgroundColor = secondary ? palette.secondary : palette.primary;
  const color = secondary ? palette.primary : palette.secondary;
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Text style={[styles.text, { color }]}>Sign in</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: metrics.borderRadius.big,
    backgroundColor: palette.primary,
    padding: metrics.padding.normal
  },
  text: {
    color: palette.text.secondary,
    fontSize: typography.fontSize.normal,
    alignSelf: "center"
  }
});

export default Button;
