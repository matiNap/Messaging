import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import metrics from '_metrics';
import palette from '_palette';
import Input from '_components/Input';
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import Touchable from '_components/Touchable';

const BottomInput = (props: any) => {
  const { onSend } = props;
  return (
    <View style={styles.inputContainer}>
      <Touchable>
        <SimpleLineIcons name="emotsmile" style={styles.icon} />
      </Touchable>

      <Input
        placeholder="Type..."
        noOutlined
        style={styles.inputStyle}
      />
      <Touchable onPress={onSend}>
        <MaterialIcons name="send" style={styles.sendIcon} />
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: metrics.padding.small,
    marginBottom: metrics.margin.normal,
    marginLeft: metrics.margin.normal,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: palette.secondary,
  },
  inputStyle: {
    backgroundColor: palette.grayscale.light,
    flex: 1,
    marginHorizontal: metrics.margin.medium,
  },
  icon: {
    color: palette.text.primary,
    fontSize: 30,
  },
  sendIcon: {
    color: palette.primary,
    fontSize: 30,
  },
});

export default BottomInput;
