import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import TabBarButton from './TabBarButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LatestButton = () => {
  return (
    <TabBarButton
      iconComponent={props => {
        return <MaterialCommunityIcons {...props} name="email" />;
      }}
    />
  );
};

export default LatestButton;
