import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import typography from '_typography';
import palette from '_palette';
import metrics from '_metrics';
import ItemAdd from './ItemAdd';
import { connect } from 'react-redux';
import { SearchedUser } from '_types';
import globals from '_globals';
import { addUser } from '_actions/creators/users';
import reactotron from 'reactotronConfig';

interface Props {
  results: SearchedUser[];
  addUser: typeof addUser;
  onAccept: Function;
  onReject: Function;
}

const Results = (props: Props) => {
  const { results, addUser, onAccept, onReject } = props;

  return (
    <View>
      <Text style={styles.title}>Add new friend</Text>
      {results.map(users => {
        const { name, photoURL, state, uid } = users;

        const avatarUri = photoURL ? photoURL : globals.primaryAvatar;
        return (
          <ItemAdd
            onPress={() => {
              addUser(uid);
            }}
            uid={uid}
            onAccept={onAccept}
            onReject={onReject}
            state={state}
            name={name}
            avatarUri={avatarUri}
          />
        );
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

export default connect(null, { addUser })(Results);
