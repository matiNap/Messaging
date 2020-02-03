import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { navigate } from "../../navigationService";

const Screen2 = props => {
  return (
    <View style={styles.container}>
      <Text>Screen2</Text>
      <Button
        title="To Screen1"
        onPress={() => {
          navigate("screen1");
        }}
      />
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

export default Screen2;
