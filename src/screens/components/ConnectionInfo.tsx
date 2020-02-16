import React, { Component } from 'react';
import { Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { runTiming } from '_helpers/animations';
import { Value } from 'react-native-reanimated';
import { interpolateColor } from 'react-native-redash';
import palette from '_palette';
import Notification from '_components/ConnectionInfo';

interface CIProps {
  mati: string;
}

class ConnectionInfo extends Component<CIProps> {
  constructor(props: CIProps) {
    super(props);

    this.value = new Value(0);
    // this.unsubscribe = NetInfo.addEventListener(state => {
    //   console.log(state);
    //   if (state.isConnected) {
    //     runTiming(this.value, 10);
    //   } else {
    //     runTiming(this.value, 0);
    //   }
    // });

    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
  }

  render() {
    const { content } = this.state;
    const { mati } = this.props;

    const color = interpolateColor(this.value, {
      inputRange: [0, 10],
      outputRange: [palette.actions.succes, palette.actions.error],
    });
    return <Notification content={content} color={color} />;
  }
}

export default ConnectionInfo;
