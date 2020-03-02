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

const ICON_SIZE = 35;

export default createStackNavigator(
  {
    mainTabs: createBottomTabNavigator(
      {
        latest: {
          screen: Latest,
          navigationOptions: {
            tabBarButtonComponent: () => {
              return <LatestButton iconSize={ICON_SIZE} />;
            },
          },
        },
        online: {
          screen: Online,
          navigationOptions: {
            tabBarButtonComponent: () => {
              return <OnlineButton iconSize={ICON_SIZE} />;
            },
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
