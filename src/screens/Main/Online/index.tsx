import React from 'react';
import Header from '../components/Header';
import FriendSearch from '../components/FriendSearch';
import { Container, Text } from 'native-base';
import FriendState from './components/FriendState';
import { User } from '_types';
import { connect } from 'react-redux';
import { RootState } from '_rootReducer';
import globals from '_globals';
import ContentLoader from '_components/ContentLoader';
import {
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import palette from '_palette';
import { SafeAreaView } from 'react-native-safe-area-context';
import SlideItem from '_components/SlideItem';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import Touchable from '_components/Touchable';
import { removeUser } from '_actions/creators/users';
import metrics from '_metrics';
import typography from '_typography';

interface Props {
  friendsOnline: User[];
  removeUser: typeof removeUser;
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
          <ScrollView
            contentContainerStyle={{
              flex: 1,
            }}
          >
            <FriendSearch />
            {friendsOnline.length !== 0 ? (
              <View style={{ marginTop: metrics.margin.normal }}>
                {friendsOnline &&
                  friendsOnline.map(data => {
                    const { online, name, photoURL } = data;
                    const avatarUri = photoURL
                      ? photoURL
                      : globals.primaryAvatar;
                    return (
                      <Touchable
                        onPress={() => {
                          this.props.removeUser(data.uid);
                        }}
                      >
                        <SlideItem
                          rightComponent={() => (
                            <Entypo
                              name="remove-user"
                              style={styles.removeUserIcon}
                            />
                          )}
                        >
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
                        </SlideItem>
                      </Touchable>
                    );
                  })}
              </View>
            ) : (
              <View style={styles.infoContainer}>
                <FontAwesome name="search" style={styles.infoIcon} />
                <Text style={styles.infoStyle}>
                  Search for friends
                </Text>
              </View>
            )}
          </ScrollView>
          <ContentLoader visible={!friendsOnline} />
        </Container>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  removeUserIcon: {
    fontSize: 28,
    color: palette.secondary,
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
  const friendsOnline = state?.users?.friendsOnline;
  return {
    friendsOnline: friendsOnline,
  };
};

export default connect(mapStateToProps, { removeUser })(Online);
