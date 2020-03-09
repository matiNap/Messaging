import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import FriendItem from '../../components/FriendItem';
import palette from '_palette';

interface Props {
  state: boolean;
  name: string;
  avatarUri: string;
  onPress: Function;
}
const STATE_SIZE = 16;

const renderOnlineState = (state: boolean) => {
  if (state) {
    return <View style={styles.stateOnline} />;
  }
  return <View style={styles.stateOffline} />;
};

const FriendState = (props: Props) => {
  const { state, onPress } = props;

  return (
    <FriendItem
      onPress={onPress}
      {...props}
      rightComponent={() => (
        <View style={styles.stateContainer}>
          {renderOnlineState(state)}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  stateOnline: {
    width: STATE_SIZE,
    height: STATE_SIZE,
    borderRadius: STATE_SIZE,
    borderColor: palette.actions.succes,
    backgroundColor: palette.actions.succes,
    borderWidth: 1,
  },
  stateOffline: {
    width: STATE_SIZE,
    height: STATE_SIZE,
    borderRadius: STATE_SIZE,
    borderColor: palette.grayscale.dark,
    backgroundColor: palette.secondary,
    borderWidth: 2,
  },
  stateContainer: {
    alignSelf: 'center',
  },
});

export default FriendState;
