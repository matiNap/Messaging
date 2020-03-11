import React from 'react';
import Header from '../components/Header';
import FriendSearch from '../components/FriendSearch';
import { List, Container } from 'native-base';
import FriendState from './components/FriendState';
import { User } from '_types';
import { connect } from 'react-redux';
import { RootState } from '_rootReducer';
import globals from '_globals';
import { navigate } from '_navigation';
import ContentLoader from '_components/ContentLoader';

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
        {friendsOnline &&
          friendsOnline.map(data => {
            const { online, name, photoURL } = data;
            const avatarUri = photoURL
              ? photoURL
              : globals.primaryAvatar;
            return (
              <FriendState
                onPress={() => {
                  navigate('chat', { user: data });
                }}
                name={name}
                avatarUri={avatarUri}
                state={online}
              />
            );
          })}
      </List>
      <ContentLoader visible={!friendsOnline} />
    </Container>
  );
};

const mapStateToProps = (state: RootState) => {
  const friendsOnline = state?.users?.friendsOnline;
  return {
    friendsOnline: friendsOnline,
  };
};

export default connect(mapStateToProps)(Online);
