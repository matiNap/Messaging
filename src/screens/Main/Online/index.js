import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Header from '../components/Header';

class Online extends Component {
  render() {
    return (
      <View>
        <Header title="Online" iconName="add" />
      </View>
    );
  }
}

export default Online;
