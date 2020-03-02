import React from 'react';
import { StyleSheet, View } from 'react-native';
import Touchable from '_components/Touchable';
import FriendItem from '../../components/FriendItem';
import { Ionicons } from '@expo/vector-icons';
import palette from '_palette';
import Button from '_components/Button';
import typography from '_typography';
import { FriendRequestState } from '_types';
import RequestButtons from './RequestButtons';
import {
  acceptRequest,
  rejectRequest,
} from '_actions/creators/users';
import { connect } from 'react-redux';

interface Props {
  state: FriendRequestState;
  name: string;
  uid: string;
  avatarUri: string;
  onPress: Function;
  onAccept: Function;
  onReject: Function;
  acceptRequest: typeof acceptRequest;
  rejectRequest: typeof rejectRequest;
}

const ItemAdd = (props: Props) => {
  const { onPress, state, uid, onAccept, onReject, name } = props;
  const buttonContent = state === 'friends' ? 'Friend' : 'Invited';
  return (
    <FriendItem
      key={name}
      noTouch
      {...props}
      rightComponent={() => (
        <View>
          {state === 'none' && (
            <Touchable onPress={onPress}>
              <Ionicons name="ios-add" style={styles.addIcon} />
            </Touchable>
          )}
          {(state === 'byMe' || state === 'friends') && (
            <Button
              title={buttonContent}
              onPress={() => {
                console.log('remove request');
              }}
              buttonStyle={styles.button}
            />
          )}
          {state === 'byUser' && (
            <RequestButtons
              onAccept={() => {
                onAccept();
                console.log(`Accepted: ${uid}`);
                props.acceptRequest(uid);
              }}
              onReject={() => {
                props.rejectRequest(uid);
                onReject();
              }}
              uid={uid}
            />
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  addIcon: {
    fontSize: 38,
    color: palette.text.primary,
  },
  button: {
    fontSize: typography.fontSize.verySmall,
    padding: 0,
  },
});

export default connect(null, { acceptRequest, rejectRequest })(
  ItemAdd,
);
