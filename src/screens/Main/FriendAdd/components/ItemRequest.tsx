import React from 'react';
import FriendItem from '../../components/FriendItem';
import { View } from 'native-base';
import RequestButtons from './RequestButtons';

interface Props {
  name: string;
  avatarUri: string;
  uid: string;
  onReject: Function;
  onAccept: Function;
}

const ItemRequest = (props: Props) => {
  const { name, onAccept, onReject, uid } = props;
  return (
    <View>
      <FriendItem
        key={name}
        {...props}
        noTouch
        rightComponent={() => {
          return (
            <RequestButtons
              onAccept={onAccept}
              onReject={onReject}
              uid={uid}
            />
          );
        }}
      />
    </View>
  );
};

export default ItemRequest;
