import React, { Component } from "react";
import { Container, Text, View } from "native-base";
import Input from "_components/Input";
import { StyleSheet } from "react-native";
import typography from "_typography";
import palette from "_palette";
import metrics from "_metrics";
import Button from "_components/Button";
import Animated from "react-native-reanimated";
import { connect } from "react-redux";
import validator from "email-validator";
import { createUser } from "_actions/creators/app";
import Loader from "_components/Loader";
import ConnectionInfo from "./components/ConnectionInfo";

// Input names
const USERNAME = "username";
const EMAIL = "email";
const FNAME = "fname";
const SNAME = "sname";
const PASS = "pass";
const RPASS = "rpass";

class SignUp extends Component {
  state = {
    inputs: {
      [USERNAME]: "mati579",
      [EMAIL]: "matipl578@gmail.com",
      [FNAME]: "Mati",
      [SNAME]: "Nap",
      [PASS]: "mati123",
      [RPASS]: "mati123"
    },
    message: "",
    visible: false
  };

  onInputChange = (name, text) => {
    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [name]: text
      }
    }));
  };

  setMessage = message => {
    this.setState({ message });
  };

  handleForms = () => {
    const { username, email, fname, sname, pass, rpass } = this.state.inputs;
    if (!username || !email || !fname || !sname || !pass || !rpass) {
      this.setMessage("Enter valid data");
    } else if (!validator.validate(email)) {
      this.setMessage("Inavlid email");
    } else if (pass.length < 6) {
      this.setMessage("Password must be at least 6 characters");
    } else if (pass !== rpass) {
      this.setMessage("Passwords are diffren");
    } else {
      this.props.createUser(
        { username, email, fname, sname, password: pass },
        () => {
          this.props.backToSignIn();
          this.setState({ inputs: {} });
          this.setState({ visible: false });
        },
        error => {
          this.setMessage("Can not create account");
          this.setState({ visible: false });
        }
      );
      this.setState({ visible: true });
    }
  };

  render() {
    const { translateY } = this.props;
    const { message, inputs, visible } = this.state;
    return (
      <Animated.View style={[styles.container, { translateY }]}>
        <Text style={styles.title}>Sign up</Text>
        <View style={styles.inputContainer}>
          <Input
            value={inputs[USERNAME]}
            type="username"
            placeholder="Username"
            style={styles.input}
            secondary
            onChangeText={text => {
              this.onInputChange(USERNAME, text);
            }}
          />
          <Input
            value={inputs[EMAIL]}
            type="emailAddress"
            placeholder="email"
            style={styles.input}
            secondary
            onChangeText={text => {
              this.onInputChange(EMAIL, text);
            }}
          />
          <View style={styles.inputNameContainer}>
            <Input
              value={inputs[FNAME]}
              type="name"
              placeholder="First name"
              style={styles.fnameInput}
              secondary
              onChangeText={text => {
                this.onInputChange(FNAME, text);
              }}
            />
            <Input
              value={inputs[SNAME]}
              type="name"
              placeholder="Surname"
              style={styles.snameInput}
              secondary
              onChangeText={text => {
                this.onInputChange(SNAME, text);
              }}
            />
          </View>
          <Input
            value={inputs[PASS]}
            secureTextEntry
            type="password"
            placeholder="Password"
            style={styles.input}
            secondary
            onChangeText={text => {
              this.onInputChange(PASS, text);
            }}
          />
          <Input
            value={inputs[RPASS]}
            secureTextEntry
            type="password"
            placeholder="Repeat password"
            style={styles.input}
            secondary
            onChangeText={text => {
              this.onInputChange(RPASS, text);
            }}
          />
        </View>

        <Text style={styles.warningText}>{message}</Text>

        <Button
          title="Create"
          style={styles.button}
          secondary
          onPress={this.handleForms}
        />
        <Loader visible={visible} />
        <ConnectionInfo />
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
    marginTop: metrics.margin.medium
  },
  warningText: {
    color: palette.actions.error,
    fontSize: typography.fontSize.small,
    alignSelf: "center",
    marginTop: metrics.margin.small
  }
});

export default connect(null, { createUser })(SignUp);
