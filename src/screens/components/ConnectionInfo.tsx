import React, { Component } from 'react';
import { Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { interpolateColor } from 'react-native-redash';
import palette from '_palette';
import Notification from '_components/Notification';
import Animated, { Easing } from 'react-native-reanimated';
import { timing } from 'react-native-redash';

class ConnectionInfo extends Component {
  state = {
    content: '',
    hide: true,
  };
  value: Animated.Value<number>;
  unsubscribe: any;

  constructor(props: Readonly<{}>) {
    super(props);

    this.value = new Animated.Value(10);
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.changeInfo(state.isConnected);
    });
  }
  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.changeInfo(isConnected);
    });
  }

  changeInfo = (isConnected: boolean) => {
    if (isConnected) {
      const { hide } = this.state;
      this.setState({ content: 'Online' });
      this.value = timing({
        duration: 200,
        from: 10,
        to: 0,
        easing: Easing.linear,
      });
      if (!hide) {
        setTimeout(() => {
          this.setState({ hide: true });
        }, 2000);
      }
    } else {
      this.setState({ content: 'Offline' });
      this.value = timing({
        duration: 200,
        from: 0,
        to: 10,
        easing: Easing.linear,
      });
      this.setState({ hide: false });
    }
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { content, hide } = this.state;

    const color = interpolateColor(this.value, {
      inputRange: [0, 10],
      outputRange: [palette.actions.succes, palette.actions.error],
    });
    return (
      <Notification content={content} color={color} hide={hide} />
    );
  }
}

export default ConnectionInfo;
