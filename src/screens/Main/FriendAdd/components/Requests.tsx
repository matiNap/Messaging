import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import palette from '_palette';
import typography from '_typography';
import metrics from '_metrics';
import ItemRequest from './ItemRequest';

const Requests = (props: any) => {
  return (
    <View>
      <Text style={styles.text}>Friends Requests</Text>
      <ItemRequest name="Mateusz Napieralski" />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: palette.grayscale.medium,
    fontSize: typography.fontSize.small,
    alignSelf: 'center',
    marginTop: metrics.margin.medium,
  },
});

export default Requests;
