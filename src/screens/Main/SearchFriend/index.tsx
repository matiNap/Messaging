import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import metrics from '_metrics';
import Input from '_components/Input';
import palette from '_palette';
import typography from '_typography';
import ContentLoader from '_components/ContentLoader';
import { List, Text } from 'native-base';
import Back from '_components/Back';
import { connect } from 'react-redux';
import { RootState } from '_rootReducer';
import { User } from '_types';
import {
  deleteSearchedOwnFriends,
  searchOwnFriends,
} from '_actions/creators/users';
import FriendState from '../Online/components/FriendState';
import globals from '_globals';

interface Props {
  results: null | User[];
  searchOwnFriends: typeof searchOwnFriends;
  deleteSearchedOwnFriends: typeof deleteSearchedOwnFriends;
}

class SearchFriend extends React.Component<Props> {
  state = {
    loading: false,
    notFound: false,
  };

  constructor(props: Props) {
    super(props);
  }
  componentWillUnmount() {
    this.props.deleteSearchedOwnFriends();
  }
  onSucces = () => {
    this.setState({ loading: false, notFound: false });
  };
  onFailed = () => {
    this.setState({
      notFound: true,
      loading: false,
    });
  };

  render() {
    const { results } = this.props;
    const { loading, notFound } = this.state;

    return (
      <KeyboardAvoidingView
        enabled
        behavior="height"
        style={{ flex: 1 }}
      >
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: palette.secondary },
          ]}
        >
          <View style={styles.container}>
            <View style={styles.search}>
              <Back />
              <Input
                placeholder="Search user"
                noOutlined
                style={styles.input}
                textInputStyle={styles.textInputStyle}
                onChangeText={text => {
                  if (text.length !== 0) {
                    this.props.searchOwnFriends(
                      text,
                      this.onSucces,
                      this.onFailed,
                    );
                    this.setState({ loading: true });
                  } else {
                    this.setState({ loading: false });
                    this.props.deleteSearchedOwnFriends();
                  }
                }}
              />
            </View>

            {!loading && (
              <List scrollEnabled>
                {results?.map(data => {
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
            )}
            <ContentLoader visible={loading} />
            {notFound && (
              <Text style={styles.notFoundText}>Not found</Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: metrics.statusBarHeight + metrics.margin.normal,
    paddingHorizontal: metrics.padding.medium,
    flex: 1,
  },
  search: {
    flexDirection: 'row',
  },
  input: {
    marginLeft: metrics.margin.medium,
    flex: 1,
  },
  textInputStyle: {
    fontSize: typography.fontSize.medium,
  },
  notFoundText: {
    color: palette.grayscale.medium,
    fontSize: typography.fontSize.normal,
    alignSelf: 'center',
    marginTop: metrics.margin.big,
  },
  title: {
    fontSize: typography.fontSize.medium,
    alignSelf: 'center',
    color: palette.grayscale.light,
    marginTop: '60%',
  },
});

const mapStateToProps = (state: RootState) => {
  const { searchedFriends } = state.users;

  return {
    results: searchedFriends.length === 0 ? null : searchedFriends,
  };
};

export default connect(mapStateToProps, {
  searchOwnFriends,
  deleteSearchedOwnFriends,
})(SearchFriend);
