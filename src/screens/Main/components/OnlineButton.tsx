import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import TabBarButton from './TabBarButton';
import { Ionicons } from '@expo/vector-icons';

const LatestButton = () => {
  return (
    <TabBarButton
      iconComponent={props => {
        return <Ionicons {...props} name="ios-person" />;
      }}
    />
  );
};

export default LatestButton;
