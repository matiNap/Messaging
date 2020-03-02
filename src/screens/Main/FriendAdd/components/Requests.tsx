import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ItemRequest from './ItemRequest';
import palette from '_palette';
import typography from '_typography';
import metrics from '_metrics';
import { FriendRequest } from '_types';

interface Props {
  requests: FriendRequest[];
  onAccept: Function;
  onReject: Function;
}

const Requests = (props: Props) => {
  const { requests, onAccept, onReject } = props;

  return (
    <View>
      <Text style={styles.text}>Friends Requests</Text>
      {requests.map((request: FriendRequest) => {
        const { name, photoURL, uid } = request;
        return (
          <ItemRequest
            onAccept={onAccept}
            onReject={onReject}
            name={name}
            avatarUri={photoURL}
            uid={uid}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: palette.grayscale.medium,
    fontSize: typography.fontSize.small,
    alignSelf: 'center',
    marginTop: metrics.margin.medium,
  },
});

export default Requests;
