import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import TabBarButton from './TabBarButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import palette from '_palette';
import { navigate } from 'navigationService';

const LatestButton = props => {
  return (
    <TabBarButton
      onPress={() => {
        navigate('latest');
      }}
      backgroundColor={palette.actions.succes}
      iconComponent={props => {
        return <MaterialCommunityIcons {...props} name="email" />;
      }}
    />
  );
};

export default LatestButton;
