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
import { navigate } from '_navigation';

interface Props {
  name: string;
  fname: string;
  subText: string;
  avatarUri: string;
  state: Object;
  date: string;
}

const LatestListItem = (props: Props) => {
  const { name, subText, avatarUri, state, fname, date } = props;
  //TODO: Check which user typed last message
  const who = fname;
  return (
    <Touchable
      onPress={() => {
        navigate('chat');
      }}
    >
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
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '55%' }}>
              <Text
                style={styles.subText}
              >{`${who}: ${subText}`}</Text>
            </View>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>

        <Thumbnail
          style={styles.subAvatar}
          source={{
            uri: avatarUri,
          }}
        />
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
  subAvatar: { width: 20, height: 20 },
  mainText: {
    fontSize: typography.fontSize.normal,
    color: palette.text.primary,
  },
  subText: {
    fontSize: typography.fontSize.verySmall,
    color: palette.grayscale.medium,

    flex: 1,
  },
  date: {
    fontSize: typography.fontSize.verySmall,
    color: palette.grayscale.medium,
    marginLeft: metrics.margin.small,
  },
  body: {
    marginTop: metrics.margin.normal,
    marginLeft: metrics.margin.medium,
  },
});

export default LatestListItem;
