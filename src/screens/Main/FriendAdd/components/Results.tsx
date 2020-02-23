import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import typography from '_typography';
import palette from '_palette';
import metrics from '_metrics';
import ItemAdd from './ItemRequest';

const Results = (props: any) => {
  return (
    <View>
      <Text style={styles.title}>Results</Text>
      <ItemAdd
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

export default Results;
