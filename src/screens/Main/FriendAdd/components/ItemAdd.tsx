import React from 'react';
import { StyleSheet } from 'react-native';
import Touchable from '_components/Touchable';
import FriendItem from '../../components/FriendItem';
import { Ionicons } from '@expo/vector-icons';
import palette from '_palette';

interface Props {
  state: 'added' | 'toAdd';
  name: string;
  avatarUri: string;
}

const ItemAdd = (props: Props) => {
  return (
    <FriendItem
      {...props}
      rightComponent={() => (
        <Touchable
          onPress={() => {
            console.log('Add friend');
          }}
        >
          <Ionicons name="ios-add" style={styles.addIcon} />
        </Touchable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  addIcon: {
    fontSize: 38,
    color: palette.text.primary,
  },
});

export default ItemAdd;
