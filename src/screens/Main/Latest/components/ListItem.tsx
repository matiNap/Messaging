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
import { Message, UserChat } from '_types';
import { format } from 'date-fns';
import globals from '_globals';
import reactotron from 'reactotronConfig';

interface Props {
  user: UserChat;
  latestMessage: Message;
  userUid: string;
  toRead: number;
}

const isMe = (aUid: string, by: string) => {
  if (by === aUid) {
    return true;
  } else return false;
};

const diffInDays = (d1: any, d2: any): number => {
  var t1 = d1.getTime();
  var t2 = d2.getTime();

  return parseInt((t1 - t2) / (24 * 3600 * 1000));
};

const getLatestMessageDate = (time: number) => {
  const currentDate = new Date();
  const messageDate = new Date(time);
  if (currentDate.getDay() === messageDate.getDay()) {
    return format(messageDate, 'p');
  } else if (Math.abs(diffInDays(currentDate, messageDate)) < 7) {
    return format(messageDate, 'E');
  } else if (
    messageDate.getFullYear() === currentDate.getFullYear()
  ) {
    return format(messageDate, 'cc MMM, yy');
  }
};

const getSubTextStyle = (byMe: boolean, readed: boolean) => {
  if (!byMe && !readed) {
    return styles.subTextAction;
  } else return styles.subTextNormal;
};

const LatestListItem = (props: Props) => {
  const { latestMessage, user, userUid, toRead } = props;
  const { name, fname, photoURL } = user;
  const avatarUri = photoURL ? photoURL : globals.primaryAvatar;
  const lastMessageBy = latestMessage.sendedBy;
  const { text, createdAt } = latestMessage;
  const byMe = isMe(userUid, lastMessageBy);
  const who = byMe ? 'Me' : fname;
  const readed = latestMessage.createdAt - toRead <= 0 ? true : false;
  const subTextStyle = getSubTextStyle(byMe, readed);

  return (
    <Touchable
      onPress={() => {
        navigate('chat', { user });
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
                style={[styles.subText, subTextStyle]}
                numberOfLines={1}
              >{`${who}: ${text}`}</Text>
            </View>

            <Text style={[styles.date, subTextStyle]}>
              {getLatestMessageDate(createdAt)}
            </Text>
          </View>
        </View>

        {!readed && byMe && (
          <Thumbnail
            style={styles.subAvatar}
            source={{
              uri: avatarUri,
            }}
          />
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
    marginLeft: metrics.margin.normal,
  },
  body: {
    marginTop: metrics.margin.normal,
    marginLeft: metrics.margin.medium,
  },
  subTextAction: {
    color: palette.text.primary,
  },
  subTextNormal: {},
});

const mapStateToProps = (state: RootState) => {
  return {
    userUid: state.app.user.uid,
  };
};

export default connect(mapStateToProps)(LatestListItem);
