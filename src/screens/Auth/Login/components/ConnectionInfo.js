import React, { Component } from "react";
import { Text, View } from "react-native";
import Notification from "_components/Notification";
import NetInfo from "@react-native-community/netinfo";
import { runTiming } from "_helpers/animations";
import { Value } from "react-native-reanimated";
import { interpolateColor } from "react-native-redash";

class ConnectionInfo extends Component {
  state = {
    content: ""
  };
  constructor(props) {
    super(props);
    this.value = new Value(0);
    this.unsubscribe = NetInfo.addEventListener(state => {
      console.log(state);
      if (state.isConnected) {
        runTiming(this.value, 10);
      } else {
        runTiming(this.value, 0);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { content } = this.props;
    const color = interpolateColor(this.value, {
      inputRange: [0, 10],
      outputRange: [palette.actions.succes, palette.actions.error]
    });
    return <Notification content={content} color={color} />;
  }
}

export default ConnectionInfo;
