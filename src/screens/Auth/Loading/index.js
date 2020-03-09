import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import withAuth from '_hocs/withAuth';
import Wave from './componenets/Wave';
import { waveVerticalRadius } from './animationHelpers';
import { connect } from 'react-redux';
import { navigate } from '../../../navigationService';
import globals from '_globals';
import palette from '_palette';
import metrics from '_metrics';
import NetInfo from '@react-native-community/netinfo';
import { checkAuth } from '_actions/creators/app';

class Loading extends React.Component {
  state = {
    isConnected: false,
  };

  constructor(props) {
    super(props);
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({ isConnected: state.isConnected });
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.navigateScreens();
    }, 500);
  }

  componentDidUpdate() {
    this.navigateScreens();
  }

  navigateScreens = () => {
    const { isConnected } = this.state;
    const { signedIn } = this.props;

    if (signedIn) {
      if (isConnected) {
        this.props.checkAuth(
          () => {
            navigate('latest');
          },
          () => {
            navigate('login');
          },
        );
      } else navigate('latest');
    } else {
      navigate('login');
    }
  };

  render() {
    const verticalRadius = waveVerticalRadius();
    return (
      <View style={{ flex: 1 }}>
        <View
          style={[
            StyleSheet.absoluteFill,
            { justifyContent: 'center' },
          ]}
        >
          <Wave verticalRadius={verticalRadius}>
            <Text style={styles.loading}>Loading</Text>
          </Wave>
          <Text style={styles.appName}>{globals.appName}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  appName: {
    fontSize: 50,
    color: palette.secondary,
    alignSelf: 'center',
    fontWeight: 'bold',
    position: 'absolute',
    top: metrics.screenHeight / 3,
  },
  loading: {
    fontSize: 35,
    color: palette.primary,
    alignSelf: 'center',
    fontWeight: 'bold',
    position: 'absolute',
    top: metrics.screenHeight / 2.2,
  },
});

const mapStateToProps = state => {
  return {
    signedIn: state.app.user.signedIn,
  };
};

export default connect(mapStateToProps, { checkAuth })(Loading);
