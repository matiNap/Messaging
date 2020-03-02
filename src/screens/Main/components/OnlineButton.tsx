import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import TabBarButton from './TabBarButton';
import { Ionicons } from '@expo/vector-icons';
import palette from '_palette';
import { navigate } from 'navigationService';

const LatestButton = () => {
  return (
    <TabBarButton
      backgroundColor={palette.primary}
      onPress={() => {
        navigate('online');
      }}
      iconComponent={props => {
        return <Ionicons {...props} name="ios-person" />;
      }}
    />
  );
};

export default LatestButton;
