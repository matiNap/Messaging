import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Header, Left, Body, Right } from 'native-base';
import Back from '_components/Back';
import palette from '_palette';
import metrics from '_metrics';
import typography from '_typography';
import { Entypo } from '@expo/vector-icons';

interface Props {
  name: string;
  displayName: string;
}

const ChatHeader = (props: Props) => {
  const { name, displayName } = props;
  return (
    <Header style={styles.header}>
      <Left style={{ flexDirection: 'row' }}>
        <Back style={styles.back} />
        <View style={styles.nameContainer}>
          <Text style={styles.mainText}>{name}</Text>

          <Text style={styles.subText}>{displayName}</Text>
        </View>
      </Left>

      <Right>
        <Entypo name="dots-three-vertical" style={styles.menuIcon} />
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: metrics.padding.medium,
    height: 65 + metrics.statusBarHeight,
    backgroundColor: palette.primary,
    borderBottomColor: palette.grayscale.light,
    borderBottomWidth: 0.3,
  },
  back: {
    color: palette.text.secondary,
    marginLeft: metrics.margin.normal,
    alignSelf: 'center',
  },
  nameContainer: {
    flexDirection: 'column',
    marginLeft: metrics.margin.medium,
  },
  mainText: {
    fontSize: typography.fontSize.medium,
    color: palette.text.secondary,
  },
  subText: {
    fontSize: typography.fontSize.small,
    color: palette.grayscale.medium,
  },
  menuIcon: {
    color: palette.text.secondary,
    fontSize: 27,
  },
});

export default ChatHeader;
