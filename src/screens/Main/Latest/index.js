import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { List } from 'native-base';
import Header from '../components/Header';
import Input from '_components/Input';
import palette from '_palette';
import { Container } from 'native-base';
import metrics from '_metrics';
import typography from '_typography';
import { FontAwesome } from '@expo/vector-icons';
import ListItem from './components/ListItem';
import FriendSearch from '../components/FriendSearch';

class Latest extends Component {
  render() {
    return (
      <Container>
        <List>
          <Header title="Chat" iconName="settings" />
          <FriendSearch />
          <ListItem
            name="Mateusz Napieralski"
            subText="No w sumie tak"
            fname="Mateusz"
            avatarUri="https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"
            date="7:03 PM"
          />
          <ListItem
            name="Mateusz Napieralski"
            subText="No w sumie tak"
            fname="Mateusz"
            avatarUri="https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"
            date="7:03 PM"
          />
          <ListItem
            name="Mateusz Napieralski"
            subText="No w sumie tak"
            fname="Mateusz"
            avatarUri="https://ramcotubular.com/wp-content/uploads/default-avatar.jpg"
            date="7:03 PM"
          />
        </List>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});

export default Latest;
