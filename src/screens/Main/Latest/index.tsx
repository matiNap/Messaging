import React, { Component } from 'react';
import { StyleSheet, AppState } from 'react-native';
import { List, Root } from 'native-base';
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
import reactotron from 'reactotronConfig';
import { ChatData } from '_types';
import globals from '_globals';

interface Props {
  changeStatus: typeof changeStatus;
  fetchOnlineUsers: typeof fetchOnlineUsers;
  listenFriendRequests: typeof listenFriendRequests;
  fetchNewMessages: typeof fetchNewMessages;
  chats: ChatData[];
}

class Latest extends Component<Props> {
  componentDidMount() {
    this.props.listenFriendRequests();
    this.props.fetchOnlineUsers();
    this.props.fetchNewMessages();

    AppState.addEventListener('change', appState => {
      if (appState === 'background') {
        this.props.changeStatus(0);
      } else {
        this.props.changeStatus(1);
      }
    });
  }

  render() {
    console.log(this.props.chats);
    const { chats } = this.props;
    return (
      <Container>
        <List>
          <Header title="Chat" iconName="settings" />
          <FriendSearch />
          {chats.map(currentChat => {
            const { user, latestMessage } = currentChat;
            const { name, photoURL, fName } = user;

            const avatarUri = photoURL
              ? photoURL
              : globals.primaryAvatar;
            return (
              <ListItem
                name={name}
                latestMessage={latestMessage}
                fname={fName}
                avatarUri={avatarUri}
                readed
              />
            );
          })}
        </List>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    chats: Object.values(state.chat.chats),
  };
};

export default connect(mapStateToProps, {
  listenFriendRequests,
  changeStatus,
  fetchOnlineUsers,
  fetchNewMessages,
})(Latest);
