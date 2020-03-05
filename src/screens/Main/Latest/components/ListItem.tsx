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
import { connect } from 'react-redux';
import { RootState } from '_rootReducer';
import { Message } from '_types';

interface Props {
  name: string;
  fname: string;
  latestMessage: Message;
  avatarUri: string;
  readed: boolean;
  userUid: string;
}

const whichUser = (aUid: string, by: string) => {
  if (by === aUid) {
    return true;
  } else return false;
};

const getLatestMessageDate = (time: string) => {
  const d = new Date(time);
  const ye = new Intl.DateTimeFormat('en', {
    year: 'numeric',
  }).format(d);
  const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(
    d,
  );
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(
    d,
  );

  return `${da}-${mo}-${ye}`;
};

const LatestListItem = (props: Props) => {
  const {
    name,
    latestMessage,
    avatarUri,
    readed,
    fname,

    userUid,
  } = props;
  const lastMessageBy = latestMessage._id;
  const { text, createdAt } = latestMessage;

  const who = whichUser(userUid, lastMessageBy) ? 'Me' : fname;
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
              <Text style={styles.subText}>{`${who}: ${text}`}</Text>
            </View>
            <Text style={styles.date}>
              {getLatestMessageDate(latestMessage.createdAt)}
            </Text>
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

const mapStateToProps = (state: RootState) => {
  return {
    userUid: state.app.user.uid,
  };
};

export default connect(mapStateToProps)(LatestListItem);
