import React from "react";
import { StyleSheet } from "react-native";
import metrics from "_metrics";
import palette from "_palette";
import { View } from "native-base";

export const StatusBar = props => {
  return <View style={styles.bar} />;
};

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    top: 0,
    left: 0,
    height: metrics.statusBarHeight,
    width: "100%",
    backgroundColor: palette.primary
  }
});

export default StatusBar;
