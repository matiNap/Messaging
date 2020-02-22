import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Bubble, BubbleProps } from 'react-native-gifted-chat';
import palette from '_palette';

const B = (props: BubbleProps) => {
  return (
    <Bubble
      wrapperStyle={{
        right: styles.rightWrapper,
        left: styles.leftWrapper,
      }}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  leftWrapper: {
    backgroundColor: palette.grayscale.light,
    padding: 3,
  },
  rightWrapper: {
    backgroundColor: palette.primary,
    padding: 3,
  },
});

export default B;
