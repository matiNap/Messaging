import React from "react";
import { View, StyleSheet } from "react-native";
import { navigate } from "../../navigationService";
import { Button, Text } from "native-base";
import typography from "_typography";
import metrics from "_metrics";
import palette from "_palette";
import globals from "_globals";
import zIndex from "_zIndex";

const Screen1 = props => {
  return (
    <View style={styles.container}>
      <Text>Screen1</Text>
      <Button
        primary
        onPress={() => {
          navigate("screen2");
        }}
      >
        <Text> To screen 2</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Screen1;
