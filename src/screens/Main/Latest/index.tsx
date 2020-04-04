import React, { Component } from 'react';
import { AppState } from 'react-native';
import { List } from 'native-base';
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
} from '_actions/creators/chat';
import { RootState } from '_rootReducer';
import { ChatData } from '_types';
import ContentLoader from '_components/ContentLoader';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import _ from 'lodash';
import * as firestore from '_apis/firestore';
import reactotron from 'reactotronConfig';

interface Props {
  changeStatus: typeof changeStatus;
  fetchOnlineUsers: typeof fetchOnlineUsers;
  listenFriendRequests: typeof listenFriendRequests;
  fetchNewMessages: typeof fetchNewMessages;
  sendNotSended: typeof sendNotSended;
  chats: ChatData[];
  uid: string;
}

class Latest extends Component<Props> {
  state = {
    empty: false,
  };
  componentDidMount() {
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
      <Container>
        <List>
          <Header title="Chat" />
          <FriendSearch />
          {chats &&
            chats.map(currentChat => {
              const {
                user,
                latestMessage,
                byMe,
                byUser,
              } = currentChat;

              if (user) {
                return (
                  <ListItem
                    key={user.name}
                    user={user}
                    latestMessage={latestMessage}
                    readed={{
                      byMe,
                      byUser,
                    }}
                  />
                );
              }
            })}
        </List>
        <ContentLoader visible={!chats && !empty} />
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const chats = state.chat.persistedChats
    ? state.chat.persistedChats
    : state.chat.chats;
  return {
    chats: Object.values(_.omit(chats, 'messages')),
  };
};

export default connect(mapStateToProps, {
  listenFriendRequests,
  changeStatus,
  fetchOnlineUsers,
  fetchNewMessages,
  sendNotSended,
})(Latest);
