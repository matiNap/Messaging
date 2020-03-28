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
import { fetchNewMessages } from '_actions/creators/chat';
import { RootState } from '_rootReducer';
import { ChatData } from '_types';
import ContentLoader from '_components/ContentLoader';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import database from '_apis/database';
import reactotron from 'reactotronConfig';

interface Props {
  changeStatus: typeof changeStatus;
  fetchOnlineUsers: typeof fetchOnlineUsers;
  listenFriendRequests: typeof listenFriendRequests;
  fetchNewMessages: typeof fetchNewMessages;
  chats: ChatData[];
  uid: string;
}

class Latest extends Component<Props> {
  state = {
    empty: false,
  };
  componentDidMount() {
    // this.props.listenFriendRequests();
    // this.props.fetchOnlineUsers();
    // this.props.fetchNewMessages(() => {
    //   this.setState({ empty: true });
    // });
    reactotron.log('latest');
    // this.registerForPushNotificationsAsync();

    AppState.addEventListener('change', appState => {
      if (appState === 'background') {
        // this.props.changeStatus(0);
      } else {
        // this.props.changeStatus(1);
      }
    });
  }

  async registerForPushNotificationsAsync() {
    const { uid } = this.props;
    const { status } = await Permissions.askAsync(
      Permissions.NOTIFICATIONS,
    );

    if (status !== 'granted') {
      alert('No notification permissions!');
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();

    return database.post(`deviceToken/${uid}?token=${token}`);
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
              const { user, latestMessage, toRead } = currentChat;

              return (
                <ListItem
                  key={user.name}
                  user={user}
                  latestMessage={latestMessage}
                  toRead={toRead}
                />
              );
            })}
        </List>
        <ContentLoader visible={!chats && !empty} />
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const chats = state.chat.chats
    ? state.chat.chats
    : state.chat.persistedChats;
  return {
    chats: chats ? Object.values(chats) : null,
    uid: state.app.user.uid,
  };
};

export default connect(mapStateToProps, {
  listenFriendRequests,
  changeStatus,
  fetchOnlineUsers,
  fetchNewMessages,
})(Latest);
