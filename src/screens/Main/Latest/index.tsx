import React, { Component } from 'react';
import { AppState, StatusBar, View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import Header from '../components/Header';
import { Container } from 'native-base';

import ListItem from './components/ListItem';
import FriendSearch from '../components/FriendSearch';
import { listenFriendRequests } from '_actions/creators/notifications';
import { fetchOnlineUsers } from '_actions/creators/users';
import { connect } from 'react-redux';
import { changeStatus } from '_actions/creators/app';
import {
  fetchNewMessages,
  sendNotSended,
  removeChat,
} from '_actions/creators/chat';
import { ChatData, Message, LocalMessage, UserChat } from '_types';
import ContentLoader from '_components/ContentLoader';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import _ from 'lodash';
import * as firestore from '_apis/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import palette from '_palette';
import SlideItem from '_components/SlideItem';
import metrics from '_metrics';
import { Feather, Ionicons } from '@expo/vector-icons';
import Touchable from '_components/Touchable';
import typography from '_typography';
import { RootState } from '_rootReducer';
import { ScrollView } from 'react-native-gesture-handler';
import reactotron from 'reactotronConfig';

interface Props {
  changeStatus: typeof changeStatus;
  fetchOnlineUsers: typeof fetchOnlineUsers;
  listenFriendRequests: typeof listenFriendRequests;
  fetchNewMessages: typeof fetchNewMessages;
  sendNotSended: typeof sendNotSended;
  chats: ChatData[];
  uid: string;
  removeChat: typeof removeChat;
}

class Latest extends Component<Props> {
  state = {
    empty: false,
  };

  componentDidMount() {
    StatusBar.setBackgroundColor(palette.secondary);
    StatusBar.setBarStyle('dark-content');
    this.props.listenFriendRequests();
    this.props.fetchOnlineUsers();
    this.props.fetchNewMessages(() => {
      this.setState({ empty: true });
    });
    this.props.sendNotSended();
    this.registerForPushNotificationsAsync();
    firestore.getCurrentUserRef().update({ online: true });

    AppState.addEventListener('change', appState => {
      if (appState === 'background') {
        firestore.getCurrentUserRef().update({ online: false });
      } else {
        firestore.getCurrentUserRef().update({ online: true });
      }
    });
  }

  async registerForPushNotificationsAsync() {
    const { status } = await Permissions.askAsync(
      Permissions.NOTIFICATIONS,
    );

    if (status !== 'granted') {
      alert('No notification permissions!');
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();

    return firestore
      .getCurrentUserRef()
      .update({ deviceToken: token });
  }

  render() {
    const { chats } = this.props;
    const { empty } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Container>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
            }}
          >
            <Header title="Chat" />
            <FriendSearch />

            {chats.length !== 0 ? (
              <View style={{ marginTop: metrics.margin.normal }}>
                {chats.map(currentChat => {
                  const {
                    user,
                    latestMessage,
                    byMe,
                    byUser,
                  } = currentChat;

                  if (user) {
                    return (
                      <SlideItem
                        key={user.name}
                        style={{ height: 60 }}
                        rightComponent={() => (
                          <Touchable
                            onPress={() => {
                              this.props.removeChat(
                                currentChat.user.uid,
                              );
                            }}
                          >
                            <Feather
                              name="trash"
                              style={styles.removeChatIcon}
                            />
                          </Touchable>
                        )}
                      >
                        <ListItem
                          user={user}
                          latestMessage={latestMessage}
                          readed={{
                            byMe,
                            byUser,
                          }}
                        />
                      </SlideItem>
                    );
                  }
                })}
              </View>
            ) : (
              <View style={styles.infoContainer}>
                <Ionicons
                  name="ios-person-add"
                  style={styles.infoIcon}
                />
                <Text style={styles.infoStyle}>
                  Add friends to chat together
                </Text>
              </View>
            )}
          </ScrollView>
          <ContentLoader visible={!chats && !empty} />
        </Container>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  removeChatIcon: {
    fontSize: 30,
    color: palette.secondary,
    alignSelf: 'center',
  },
  infoStyle: {
    color: palette.grayscale.medium,
    fontSize: typography.fontSize.medium,
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
    width: '65%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  infoIcon: {
    color: palette.grayscale.medium,
    fontSize: 35,
    margin: 5,
    alignSelf: 'center',
  },
});

const mapStateToProps = (state: RootState) => {
  const chats = state.chat.persistedChats
    ? state.chat.persistedChats
    : state.chat.chats;
  return {
    chats: Object.values(_.omit(chats, 'messages')).sort(
      (a: ChatData, b: ChatData) => {
        if (!a.latestMessage || !b.latestMessage) return -1;
        return (
          new Date(b.latestMessage.createdAt) -
          new Date(a.latestMessage.createdAt)
        );
      },
    ),
  };
};

export default connect(mapStateToProps, {
  listenFriendRequests,
  changeStatus,
  fetchOnlineUsers,
  fetchNewMessages,
  sendNotSended,
  removeChat,
})(Latest);
