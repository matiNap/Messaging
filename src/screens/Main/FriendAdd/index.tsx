import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import metrics from '_metrics';
import Input from '_components/Input';
import palette from '_palette';
import typography from '_typography';
import ContentLoader from '_components/ContentLoader';
import { List, Text } from 'native-base';
import Back from '_components/Back';
import Requests from './components/Requests';
import Results from './components/Results';
import { connect } from 'react-redux';
import { RootState } from '_rootReducer';
import { User, FriendRequest } from '_types';
import {
  searchUser,
  deleteSearchedUsers,
} from '_actions/creators/users';

interface Props {
  requests: null | FriendRequest[];
  results: null | User[];
  searchUser: typeof searchUser;
  deleteSearchedUsers: typeof deleteSearchedUsers;
}

class FriendAdd extends React.Component<Props> {
  state = {
    loading: false,
    notFound: false,
  };
  componentWillUnmount() {
    this.props.deleteSearchedUsers();
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
    const { requests, results } = this.props;
    const { loading, notFound } = this.state;
    console.log(notFound);
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
                placeholder="Search friend"
                noOutlined
                style={styles.input}
                textInputStyle={styles.textInputStyle}
                onChangeText={text => {
                  if (text.length !== 0) {
                    this.props.searchUser(
                      text,
                      this.onSucces,
                      this.onFailed,
                    );
                    this.setState({ loading: true });
                  } else {
                    this.setState({ loading: false });
                    this.props.deleteSearchedUsers();
                  }
                }}
              />
            </View>
            <ContentLoader />
            {!loading && (
              <List scrollEnabled>
                {requests && !results && !notFound && (
                  <Requests requests={requests} />
                )}
                {results && <Results results={results} />}
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
});

const mapStateToProps = (state: RootState) => {
  const { friendRequests } = state.notifications;
  const { searched } = state.users;

  return {
    requests: friendRequests.length !== 0 ? friendRequests : null,
    results: searched.length !== 0 ? searched : null,
  };
};

export default connect(mapStateToProps, {
  searchUser,
  deleteSearchedUsers,
})(FriendAdd);
