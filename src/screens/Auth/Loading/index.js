import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import Wave from './componenets/Wave';
import { waveVerticalRadius } from './animationHelpers';
import { connect } from 'react-redux';
import globals from '_globals';
import palette from '_palette';
import metrics from '_metrics';
import NetInfo from '@react-native-community/netinfo';
import { checkAuth } from '_actions/creators/app';
import reactotron from 'reactotron-react-native';
import { useNavigation } from '@react-navigation/native';
import navigate from '_navigation';

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
    StatusBar.setBackgroundColor(palette.primary);
    StatusBar.setBarStyle('light-content');
    this.props.checkAuth(() => {
      navigate('login');
    });
  }

  render() {
    const verticalRadius = waveVerticalRadius();

    return (
      <View style={[StyleSheet.absoluteFill]}>
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

export const LoadingNav = props => {
  const navigation = useNavigation();
  return <Loading {...props} navigation={navigation} />;
};

export default connect(null, { checkAuth })(Loading);
