import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ItemRequest from './ItemRequest';
import {
  acceptRequest,
  rejectRequest,
} from '_actions/creators/notifications';
import { connect } from 'react-redux';
import palette from '_palette';
import typography from '_typography';
import metrics from '_metrics';
import { FriendRequest } from '_types';

interface Props {
  acceptRequest: typeof acceptRequest;
  rejectRequest: typeof rejectRequest;
  requests: FriendRequest[];
}

const renderRequests = (
  requests: FriendRequest[],
  acceptRequest: Function,
  rejectRequest: Function,
) => {
  return requests.map((request: FriendRequest) => {
    const { name, uid, photoURL } = request;
    return (
      <ItemRequest
        onAccept={() => {
          acceptRequest(uid);
        }}
        onReject={() => {
          rejectRequest(uid);
        }}
        name={name}
        avatarUri={photoURL}
      />
    );
  });
};

const Requests = (props: Props) => {
  const { requests, acceptRequest, rejectRequest } = props;

  return (
    <View>
      <Text style={styles.text}>Friends Requests</Text>
      {renderRequests(requests, acceptRequest, rejectRequest)}
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

export default connect(null, { acceptRequest, rejectRequest })(
  Requests,
);
