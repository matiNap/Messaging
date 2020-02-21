import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import metrics from '_metrics';
import Input from '_components/Input';
import FriendSearch from '../components/FriendSearch';
import { List, Container } from 'native-base';
import FriendItem from '../components/FriendItem';

class Online extends Component {
  render() {
    return (
      <Container>
        <Header title="Online" iconName="add" />
        <List>
          <FriendSearch />
          <FriendItem
            name="Mateusz Napieralski"
            avatarUri="https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"
            state={true}
            showState
          />
          <FriendItem
            name="Mateusz Napieralski"
            avatarUri="https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"
            state={true}
            showState
          />
          <FriendItem
            name="Mateusz Napieralski"
            avatarUri="https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"
            state={false}
            showState
          />
        </List>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});

export default Online;
