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
import Notification from '_components/Notification';

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
  notificationRef: React.RefObject<Notification>;
  constructor(props: Props) {
    super(props);
    this.notificationRef = React.createRef();
  }
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

  onReject = () => {
    this.notificationRef.open('Rejected', palette.actions.error);
  };

  onAccept = () => {
    this.notificationRef.open('Accept', palette.actions.succes);
  };
  render() {
    const { requests, results } = this.props;
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

            {!loading && (
              <List scrollEnabled>
                {requests && !results && !notFound && (
                  <Requests
                    requests={requests}
                    onAccept={this.onAccept}
                    onReject={this.onReject}
                  />
                )}
                {results && (
                  <Results
                    results={results}
                    onAccept={this.onAccept}
                    onReject={this.onReject}
                  />
                )}
              </List>
            )}
            <ContentLoader visible={loading} />
            {notFound && (
              <Text style={styles.notFoundText}>Not found</Text>
            )}
          </View>
          <Notification
            duration={1000}
            ref={ref => {
              this.notificationRef = ref;
            }}
          />
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
