import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Latest from './Latest';
import Online from './Online';
import TabBarComponent from './components/TabBarComponent';
import LatestButton from './components/LatestButton';
import OnlineButton from './components/OnlineButton';
import Profile from './Profile';
import FriendAdd from './FriendAdd';
import SearchFriend from './SearchFriend';
import Chat from './Chat';

export default createStackNavigator(
  {
    mainTabs: createBottomTabNavigator(
      {
        latest: {
          screen: Latest,
          navigationOptions: {
            tabBarButtonComponent: LatestButton,
          },
        },
        online: {
          screen: Online,
          navigationOptions: {
            tabBarButtonComponent: OnlineButton,
          },
        },
      },
      {
        tabBarComponent: props => <TabBarComponent {...props} />,
      },
    ),
    chat: Chat,
    //Modals:
    profile: Profile,
    friendAdd: FriendAdd,
    searchFriend: SearchFriend,
  },
  {
    headerMode: 'none',
  },
);
