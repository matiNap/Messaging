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
import Back from '_components/Back';
import Requests from './components/Requests';
import Results from './components/Results';
import ItemAdd from './components/ItemAdd';

const FriendAdd = props => {
  const { results } = props;
  // const results = 1;

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: palette.secondary },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.search}>
          <Back />
          <Input
            placeholder="Search friend"
            noOutlined
            style={styles.input}
            textInputStyle={styles.textInputStyle}
          />
        </View>
        <ContentLoader />
        <List scrollEnabled>
          {!results && <Requests />}
          {results && <Results />}
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
  input: {
    marginLeft: metrics.margin.medium,
  },
  textInputStyle: {
    fontSize: typography.fontSize.medium,
  },
});

export default FriendAdd;
