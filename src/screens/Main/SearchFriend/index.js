import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import metrics from '_metrics';
import Input from '_components/Input';
import { Ionicons } from '@expo/vector-icons';
import palette from '_palette';
import typography from '_typography';
import Touchable from '_components/Touchable';
import FriendItem from '../components/FriendItem';
import ContentLoader from '_components/ContentLoader';
import { List } from 'native-base';

const SearchFriend = props => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: palette.secondary },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.search}>
          <Touchable
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Ionicons name="ios-arrow-back" style={styles.icon} />
          </Touchable>
          <Input
            placeholder="Search"
            noOutlined
            style={styles.input}
            textInputStyle={styles.textInputStyle}
          />
        </View>
        <ContentLoader />
        <List scrollEnabled>
          <FriendItem
            name="Mateusz Napieralski"
            avatarUri="https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"
          />
          <FriendItem
            name="Mateusz Napieralski"
            avatarUri="https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"
          />
          <FriendItem
            name="Mateusz Napieralski"
            avatarUri="https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"
          />
        </List>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: metrics.statusBarHeight + metrics.margin.normal,
    paddingHorizontal: metrics.padding.medium,
    flex: 1,
  },
  search: {
    flexDirection: 'row',
  },
  icon: {
    color: palette.text.primary,
    fontSize: 35,
  },
  input: {
    marginLeft: metrics.margin.medium,
  },
  textInputStyle: {
    fontSize: typography.fontSize.medium,
  },
});

export default SearchFriend;
