import React, { Component } from 'react';
import { StyleSheet, AppState } from 'react-native';
import { List } from 'native-base';
import Header from '../components/Header';
import { Container } from 'native-base';

import ListItem from './components/ListItem';
import FriendSearch from '../components/FriendSearch';
import { listenFriendRequests } from '_actions/creators/notifications';
import { fetchOnlineUsers } from '_actions/creators/users';
import { connect } from 'react-redux';
import { changeStatus } from '_actions/creators/app';

interface Props {
  changeStatus: typeof changeStatus;
  fetchOnlineUsers: typeof fetchOnlineUsers;
  listenFriendRequests: typeof listenFriendRequests;
}

class Latest extends Component<Props> {
  componentDidMount() {
    this.props.listenFriendRequests();
    this.props.fetchOnlineUsers();

    AppState.addEventListener('change', appState => {
      if (appState === 'background') {
        this.props.changeStatus(0);
      } else {
        this.props.changeStatus(1);
      }
    });
  }

  render() {
    return (
      <Container>
        <List>
          <Header title="Chat" iconName="settings" />
          <FriendSearch />
          <ListItem
            name="Mateusz Napieralski"
            subText="No w sumie tak"
            fname="Mateusz"
            avatarUri="https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"
            date="7:03 PM"
          />
          <ListItem
            name="Mateusz Napieralski"
            subText="No w sumie tak"
            fname="Mateusz"
            avatarUri="https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"
            date="7:03 PM"
          />
          <ListItem
            name="Mateusz Napieralski"
            subText="No w sumie tak"
            fname="Mateusz"
            avatarUri="https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"
            date="7:03 PM"
          />
        </List>
      </Container>
    );
  }
}

export default connect(null, {
  listenFriendRequests,
  changeStatus,
  fetchOnlineUsers,
})(Latest);
