import React from 'react';
import { StyleSheet } from 'react-native';
import Touchable from '_components/Touchable';
import FriendItem from '../../components/FriendItem';
import palette from '_palette';
import { AntDesign } from '@expo/vector-icons';
import { View, Text } from 'native-base';
import typography from '_typography';
import metrics from '_metrics';

interface Props {
  name: string;
  avatarUri: string;
  onReject: Function;
  onAccept: Function;
}

const ICON_SIZE = 27;

const renderRightComponent = (props: {
  onAccept: Function;
  onReject: Function;
}) => {
  const { onReject, onAccept } = props;

  return (
    <View style={{ flexDirection: 'row' }}>
      <Touchable onPress={onAccept}>
        <AntDesign name="check" style={styles.accept} />
      </Touchable>
      <Touchable onPress={onReject}>
        <AntDesign name="close" style={styles.reject} />
      </Touchable>
    </View>
  );
};

const ItemRequest = (props: Props) => {
  return (
    <FriendItem
      {...props}
      noTouch
      rightComponent={() => {
        return renderRightComponent({
          ...props,
        });
      }}
    />
  );
};

const styles = StyleSheet.create({
  accept: {
    fontSize: ICON_SIZE,
    color: palette.actions.succes,
  },
  reject: {
    fontSize: ICON_SIZE,
    color: palette.actions.error,
  },
  acceptedText: {
    fontSize: typography.fontSize.small,
    color: palette.actions.succes,
    marginRight: metrics.margin.normal,
    alignSelf: 'center',
  },
});

export default ItemRequest;
