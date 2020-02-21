import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';
import palette from '_palette';

interface Props {
  visible: boolean;
}

const ContentLoader = (props: Props) => {
  const { visible } = props;
  if (visible) {
    return (
      <View style={styles.container}>
        <Spinner
          style={styles.spinner}
          color={palette.primary}
          size={55}
        />
      </View>
    );
  } else return null;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  spinner: {
    alignSelf: 'center',
  },
});

export default ContentLoader;
