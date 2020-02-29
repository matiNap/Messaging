import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import typography from '_typography';
import palette from '_palette';
import metrics from '_metrics';
import ItemAdd from './ItemAdd';
import { connect } from 'react-redux';
import { sendFriendRequest } from '_actions/creators/notifications';
import { User } from '_types';
import globals from '_globals';

interface Props {
  sendFriendRequest: typeof sendFriendRequest;
  results: User[];
}

const renderResults = (
  results: User[],
  onPress: typeof sendFriendRequest,
) => {
  return results.map(users => {
    const { name, avatarUri, state, uid } = users;

    const avatar = avatarUri ? avatarUri : globals.primaryAvatar;
    return (
      <ItemAdd
        onPress={() => {
          onPress(uid);
        }}
        state={state}
        name={name}
        avatarUri={avatar}
      />
    );
  });
};

const Results = (props: Props) => {
  const { results } = props;

  return (
    <View>
      <Text style={styles.title}>Results</Text>
      {renderResults(results, (uid: string) => {
        props.sendFriendRequest(uid);
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: typography.fontSize.small,
    color: palette.grayscale.medium,
    alignSelf: 'center',
    marginTop: metrics.margin.medium,
  },
});

export default connect(null, { sendFriendRequest })(Results);
