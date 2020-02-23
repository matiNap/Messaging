import React from 'react';
import { StyleSheet } from 'react-native';
import Touchable from '_components/Touchable';
import FriendItem from '../../components/FriendItem';
import palette from '_palette';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Button from '_components/Button';
import { View } from 'native-base';
import typography from '_typography';

interface Props {
  state: 'added' | 'toAdd';
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

const ItemAdd = (props: Props) => {
  const { onAccept, onReject } = props;
  return (
    <FriendItem
      {...props}
      noTouch
      rightComponent={props => {
        return renderRightComponent({
          ...props,
          ...{ onAccept, onReject },
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
});

export default ItemAdd;
