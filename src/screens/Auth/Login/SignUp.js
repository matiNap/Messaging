import React, { Component } from "react";
import { Container, Text, View } from "native-base";
import Input from "_components/Input";
import { StyleSheet } from "react-native";
import typography from "_typography";
import palette from "_palette";
import metrics from "_metrics";
import Button from "_components/Button";
import Animated from "react-native-reanimated";

class SignUp extends Component {
  render() {
    const { style, translateY } = this.props;
    return (
      <Animated.View style={[styles.container, { translateY }]}>
        <Text style={styles.title}>Sign up</Text>
        <View style={styles.inputContainer}>
          <Input placeholder="Username" style={styles.input} secondary />
          <Input placeholder="email" style={styles.input} secondary />
          <View style={styles.inputNameContainer}>
            <Input
              placeholder="First name"
              style={styles.fnameInput}
              secondary
            />
            <Input placeholder="Surname" style={styles.snameInput} secondary />
          </View>
          <Input placeholder="Password" style={styles.input} secondary />
          <Input placeholder="Repeat password" style={styles.input} secondary />
        </View>
        <Button title="Create" style={styles.button} secondary />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: palette.primary,
    width: metrics.screenWidth,
    height: metrics.screenHeight,
    top: 0,
    left: 0
  },
  title: {
    fontSize: typography.fontSize.big,
    color: palette.secondary,
    alignSelf: "center",
    marginTop: 70
  },
  inputContainer: {
    marginTop: 30,
    width: "85%",
    alignSelf: "center"
  },
  inputNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: metrics.margin.normal
  },
  fnameInput: {
    flex: 1,
    marginRight: 5
  },
  snameInput: {
    flex: 1,
    marginLeft: 5
  },
  input: {
    marginVertical: metrics.margin.normal
  },
  button: {
    width: "70%",
    alignSelf: "center",
    marginTop: metrics.margin.big
  }
});

export default SignUp;
