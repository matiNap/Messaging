import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Text, View, Container } from 'native-base';
import validator from 'email-validator';
import { connect } from 'react-redux';

import Button from '_components/Button';
import Input from '_components/Input';
import globals from '_globals';
import typography from '_typography';
import metrics from '_metrics';
import Animated from 'react-native-reanimated';
import palette from '_palette';
import { signIn } from '_actions/creators/app';
import Loader from '_components/Loader';
import reactotron from 'reactotron-react-native';
import firebase from 'firebase';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    loaderVisible: false,
  };
  handleForm = () => {
    const { email, password } = this.state;
    if (!validator.validate(email)) {
      this.setMessage('Invalid email');
    } else {
      this.setState({ loaderVisible: true });
      this.props.signIn(email, password, message => {
        this.setMessage(message);
        this.setState({ loaderVisible: false });
      });
    }
  };
  setMessage = message => {
    this.setState({ message });
  };
  render() {
    const { translateY } = this.props;
    const { password, email, message, loaderVisible } = this.state;

    return (
      <Animated.View style={{ translateY }}>
        <KeyboardAvoidingView behavior="position">
          <Text style={styles.appName}>{globals.appName}</Text>
          <Text style={styles.title}>Sign in</Text>

          <View style={styles.inputContainer}>
            <Input
              color={palette.text.primary}
              placeholder="Email"
              autoCapitalize="none"
              type="email-address"
              style={styles.input}
              value={email}
              onChangeText={text => {
                this.setState({ email: text.replace(/\s/g, '') });
              }}
              textInputStyle={styles.textInput}
            />
            <Input
              color={palette.text.primary}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry
              value={password}
              onChangeText={text => {
                this.setState({ password: text.replace(/\s/g, '') });
              }}
              style={styles.input}
              textInputStyle={styles.textInput}
            />
          </View>
          <Button
            style={styles.button}
            title="Sign in"
            onPress={this.handleForm}
          />
          <Text style={styles.warningText}>{message}</Text>
        </KeyboardAvoidingView>
        <Loader visible={loaderVisible} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 55,
    color: palette.primary,
    alignSelf: 'center',
    marginTop: 60,
    padding: metrics.padding.normal,
  },
  title: {
    fontSize: typography.fontSize.big,
    color: palette.primary,
    marginTop: 30,
    alignSelf: 'center',
  },
  input: {
    marginVertical: metrics.margin.medium,
  },
  inputContainer: {
    alignSelf: 'center',
    width: '80%',
    marginTop: metrics.margin.medium,
  },
  textInput: {
    fontSize: typography.fontSize.normal,
    color: palette.text.primary,
  },
  button: {
    width: '45%',
    alignSelf: 'center',
    marginTop: metrics.margin.big,
  },
  warningText: {
    color: palette.actions.error,
    fontSize: typography.fontSize.small,
    alignSelf: 'center',
    marginTop: metrics.margin.medium,
  },
});

export default connect(null, { signIn })(SignIn);
