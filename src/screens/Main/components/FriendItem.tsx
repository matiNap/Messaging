import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, ListItem, Thumbnail, Left } from 'native-base';
import palette from '_palette';
import metrics from '_metrics';
import typography from '_typography';
import Touchable from '_components/Touchable';
import Button from '_components/Button';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  name: string;
  avatarUri: string;
  state: Object;
  addFriend?: boolean;
}
const STATE_SIZE = 16;

const renderOnlineState = (state: boolean) => {
  if (state) {
    return <View style={styles.stateOnline} />;
  }
  return <View style={styles.stateOffline} />;
};

const LatestListItem = (props: Props) => {
  const { name, avatarUri, state, addFriend } = props;
  return (
    <Touchable>
      <ListItem itemDivider={false} style={styles.listItem} avatar>
        <Left>
          <Thumbnail
            style={styles.mainAvatar}
            source={{
              uri: avatarUri,
            }}
          />
        </Left>
        <View style={styles.body}>
          <Text style={styles.mainText}>{name}</Text>
        </View>
        {!addFriend && (
          <View style={styles.stateContainer}>
            {renderOnlineState(state)}
          </View>
        )}
        {addFriend && (
          <Touchable
            onPress={() => {
              console.log('Add friend');
            }}
          >
            <Ionicons name="ios-add" style={styles.addIcon} />
          </Touchable>
        )}
      </ListItem>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: palette.secondary,
    marginTop: metrics.margin.normal,
  },
  mainAvatar: { width: 42, height: 42 },
  mainText: {
    fontSize: typography.fontSize.normal,
    color: palette.text.primary,
  },
  addIcon: {
    fontSize: 38,
    color: palette.text.primary,
  },
  body: {
    marginTop: metrics.margin.normal,
    marginLeft: metrics.margin.medium,
    width: '70%',
  },
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

export default LatestListItem;
