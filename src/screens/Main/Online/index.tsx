import React from 'react';
import Header from '../components/Header';
import FriendSearch from '../components/FriendSearch';
import { List, Container } from 'native-base';
import FriendState from './components/FriendState';
import { User } from '_types';
import { connect } from 'react-redux';
import { RootState } from '_rootReducer';
import globals from '_globals';
import ContentLoader from '_components/ContentLoader';
import { StatusBar } from 'react-native';
import palette from '_palette';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  friendsOnline: User[];
}

class Online extends React.Component<Props> {
  componentDidMount() {
    StatusBar.setBackgroundColor(palette.secondary);
    StatusBar.setBarStyle('dark-content');
  }
  render() {
    const { friendsOnline } = this.props;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          <Header title="Friends" iconName="add" />
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
                      this.props.navigation.navigate('chat', {
                        user: data,
                      });
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
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const friendsOnline = state?.users?.friendsOnline;
  return {
    friendsOnline: friendsOnline,
  };
};

export default connect(mapStateToProps)(Online);
