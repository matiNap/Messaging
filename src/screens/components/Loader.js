import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Spinner, Content } from 'native-base';
import palette from '_palette';

const Loader = props => {
  const { visible } = props;
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <Spinner
          style={styles.spinner}
          color={palette.primary}
          size={70}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(31,31,31,0.6)',
    flex: 1,
  },
  spinner: {
    alignSelf: 'center',
  },
});

export default Loader;
