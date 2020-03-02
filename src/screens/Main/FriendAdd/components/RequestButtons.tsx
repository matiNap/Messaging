import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Touchable from '_components/Touchable';
import palette from '_palette';
import metrics from '_metrics';
import {
  acceptRequest,
  rejectRequest,
} from '_actions/creators/notifications';
import { connect } from 'react-redux';

const ICON_SIZE = 27;

interface Props {
  acceptRequest: typeof acceptRequest;
  rejectRequest: typeof rejectRequest;
  onAccept: Function;
  onReject: Function;
  uid: string;
}

const RequestButtons = (props: Props) => {
  const { onAccept, onReject, uid } = props;
  console.log(uid);
  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      <Touchable
        onPress={() => {
          onAccept();
          props.acceptRequest(uid);
        }}
      >
        <AntDesign name="check" style={styles.accept} />
      </Touchable>
      <Touchable
        onPress={() => {
          onReject();
          props.rejectRequest(uid);
        }}
      >
        <AntDesign name="close" style={styles.reject} />
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  accept: {
    fontSize: ICON_SIZE,
    color: palette.actions.succes,
    marginRight: metrics.margin.medium,
  },
  reject: {
    fontSize: ICON_SIZE,
    color: palette.actions.error,
  },
});

export default connect(null, { acceptRequest, rejectRequest })(
  RequestButtons,
);
