import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Text, View, Container } from "native-base";
import Button from "_components/Button";
import Input from "_components/Input";
import globals from "_globals";
import typography from "_typography";
import palette from "_palette";
import metrics from "_metrics";
import Animated from "react-native-reanimated";

class SignIn extends Component {
  render() {
    const { translateY } = this.props;
    return (
      <Animated.View style={{ translateY }}>
        <Text style={styles.appName}>{globals.appName}</Text>
        <Text style={styles.title}>Sign in</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="email"
            style={styles.input}
            textInputStyle={styles.textInput}
          />
          <Input
            placeholder="password"
            style={styles.input}
            textInputStyle={styles.textInput}
          />
        </View>
        <Button style={styles.button} title="Sign in" />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 55,
    color: palette.primary,
    alignSelf: "center",
    marginTop: 60,
    padding: metrics.padding.normal
  },
  title: {
    fontSize: typography.fontSize.big,
    color: palette.primary,
    marginTop: 30,
    alignSelf: "center"
  },
  input: {
    marginVertical: metrics.margin.medium
  },
  inputContainer: {
    alignSelf: "center",
    width: "70%",
    marginTop: metrics.margin.medium
  },
  textInput: {
    fontSize: typography.fontSize.medium
  },
  button: {
    width: "45%",
    alignSelf: "center",
    marginTop: metrics.margin.big
  }
});

export default SignIn;
