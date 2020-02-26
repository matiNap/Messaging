import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import typography from '_typography';
import palette from '_palette';
import metrics from '_metrics';
import ItemAdd from './ItemAdd';
import { connect } from 'react-redux';
import { sendFriendRequest } from '_actions/creators/notifications';

interface Props {
  uid: string;
  name: string;
  avatartUri: string;
  sendFriendRequest: typeof sendFriendRequest;
}

const Results = (props: Props) => {
  const { uid, name, avatartUri } = props;

  return (
    <View>
      <Text style={styles.title}>Results</Text>
      <ItemAdd
        onPress={() => {
          props.sendFriendRequest(
            uid,
            () => {
              console.log('succes');
            },
            () => {
              console.log('Failed');
            },
          );
        }}
        addFriend
        name="Mateusz Napieralski"
        avatarUri="https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"
      />
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
