import React from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Item,
  Text,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
} from 'native-base';
import palette from '_palette';
import metrics from '_metrics';
import typography from '_typography';
import Touchable from '_components/Touchable';

interface Props {
  name: string;
  avatarUri: string;
  state: Object;
}
const STATE_SIZE = 16;

const renderOnlineState = state => {
  if (state) {
    return <View style={styles.stateOnline} />;
  }
  return <View style={styles.stateOffline} />;
};

const LatestListItem = (props: Props) => {
  const { name, avatarUri, state } = props;
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
        <View style={styles.stateContainer}>
          {renderOnlineState(state)}
        </View>
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
