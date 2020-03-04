import React from 'react';
import Header from '../components/Header';
import FriendSearch from '../components/FriendSearch';
import { List, Container } from 'native-base';
import FriendState from './components/FriendState';
import { User } from '_types';
import { connect } from 'react-redux';
import { RootState } from '_rootReducer';
import globals from '_globals';

interface Props {
  friendsOnline: User[];
}

const Online = (props: Props) => {
  const { friendsOnline } = props;
  return (
    <Container>
      <Header title="Online" iconName="add" />
      <List>
        <FriendSearch />
        {friendsOnline.map(data => {
          const { online, name, photoURL } = data;
          const avatarUri = photoURL
            ? photoURL
            : globals.primaryAvatar;
          return (
            <FriendState
              name={name}
              avatarUri={avatarUri}
              state={online}
            />
          );
        })}
      </List>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => {
  const friendsOnline = state.users.friendsOnline;
  return {
    friendsOnline: friendsOnline.length === 0 ? null : friendsOnline,
  };
};

export default connect(mapStateToProps)(Online);
