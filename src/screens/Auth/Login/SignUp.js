import React, { Component } from 'react';
import { Container, Text, View } from 'native-base';
import Input from '_components/Input';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import typography from '_typography';
import metrics from '_metrics';
import palette from '_palette';
import Button from '_components/Button';
import Animated from 'react-native-reanimated';
import { connect } from 'react-redux';
import validator from 'email-validator';
import { createUser } from '_actions/creators/app';
import Loader from '_components/Loader';

// Input names
const USERNAME = 'username';
const EMAIL = 'email';
const FNAME = 'fname';
const SNAME = 'sname';
const PASS = 'pass';
const RPASS = 'rpass';

class SignUp extends Component {
  state = {
    inputs: {
      [USERNAME]: '',
      [EMAIL]: '',
      [FNAME]: '',
      [SNAME]: '',
      [PASS]: '',
      [RPASS]: '',
    },
    message: '',
    visible: false,
  };

  onInputChange = (name, text) => {
    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [name]: text,
      },
    }));
  };

  setMessage = message => {
    this.setState({ message });
  };

  handleForms = () => {
    const {
      username,
      email,
      fname,
      sname,
      pass,
      rpass,
    } = this.state.inputs;
    if (!username || !email || !fname || !sname || !pass || !rpass) {
      this.setMessage('Enter valid data');
    } else if (!validator.validate(email)) {
      this.setMessage('Inavlid email');
    } else if (pass.length < 6) {
      this.setMessage('Password must be at least 6 characters');
    } else if (pass !== rpass) {
      this.setMessage('Passwords are diffrent');
    } else {
      this.props.createUser(
        { username, email, fname, sname, password: pass },
        () => {
          this.props.backToSignIn();
          this.setState({ inputs: {} });
          this.setState({ visible: false });
        },
        error => {
          this.setMessage('Can not create account');
          this.setState({ visible: false });
        },
      );
      this.setState({ visible: true });
    }
  };

  render() {
    const { translateY } = this.props;
    const { message, inputs, visible } = this.state;

    return (
      <Animated.View style={[styles.container, { translateY }]}>
        <KeyboardAvoidingView behavior="position">
          <Text style={styles.title}>Sign up</Text>
          <View style={styles.inputContainer}>
            <Input
              autoCapitalize="none"
              color={palette.secondary}
              value={inputs[USERNAME]}
              type="default"
              placeholder="Username"
              style={styles.input}
              secondary
              onChangeText={text => {
                this.onInputChange(USERNAME, text);
              }}
            />
            <Input
              autoCapitalize="none"
              color={palette.secondary}
              value={inputs[EMAIL]}
              type="email-address"
              placeholder="email"
              style={styles.input}
              secondary
              onChangeText={text => {
                this.onInputChange(EMAIL, text.replace(/\s/g, ''));
              }}
            />
            <View style={styles.inputNameContainer}>
              <Input
                color={palette.secondary}
                value={inputs[FNAME]}
                type="default"
                placeholder="First name"
                style={styles.fnameInput}
                secondary
                onChangeText={text => {
                  this.onInputChange(FNAME, text);
                }}
              />
              <Input
                color={palette.secondary}
                value={inputs[SNAME]}
                type="default"
                placeholder="Surname"
                style={styles.snameInput}
                secondary
                onChangeText={text => {
                  this.onInputChange(SNAME, text);
                }}
              />
            </View>
            <Input
              color={palette.secondary}
              value={inputs[PASS]}
              secureTextEntry
              type="default"
              placeholder="Password"
              style={styles.input}
              secondary
              onChangeText={text => {
                this.onInputChange(PASS, text);
              }}
            />
            <Input
              color={palette.secondary}
              value={inputs[RPASS]}
              secureTextEntry
              type="default"
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
        </KeyboardAvoidingView>
        <Loader visible={visible} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: palette.primary,
    width: metrics.screenWidth,
    height: metrics.screenHeight,
    top: 0,
    left: 0,
  },
  title: {
    fontSize: typography.fontSize.big,
    color: palette.secondary,
    alignSelf: 'center',
    marginTop: 70,
  },
  inputContainer: {
    marginTop: 30,
    width: '85%',
    alignSelf: 'center',
  },
  inputNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: metrics.margin.normal,
  },
  fnameInput: {
    flex: 1,
    marginRight: 5,
  },
  snameInput: {
    flex: 1,
    marginLeft: 5,
  },
  input: {
    marginVertical: metrics.margin.normal,
  },
  button: {
    width: '70%',
    alignSelf: 'center',
    marginTop: metrics.margin.medium,
  },
  warningText: {
    color: palette.actions.error,
    fontSize: typography.fontSize.small,
    alignSelf: 'center',
    marginTop: metrics.margin.small,
  },
});

export default connect(null, { createUser })(SignUp);
