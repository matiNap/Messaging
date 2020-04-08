import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Chat from './Chat';
import SearchFriend from './SearchFriend';
import FriendAdd from './FriendAdd';
import Latest from './Latest';
import Profile from './Profile';
import Online from './Online';
import LatestButton from './components/LatestButton';
import OnlineButton from './components/OnlineButton';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="latest"
        component={Latest}
        options={{
          tabBarIcon: ({ focused }) => (
            <LatestButton iconSize={35} checked={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="online"
        component={Online}
        options={{
          tabBarIcon: ({ focused }) => (
            <OnlineButton iconSize={35} checked={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" component={Main} />
      <Stack.Screen name="chat" component={Chat} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="searchFriend" component={SearchFriend} />
      <Stack.Screen name="friendAdd" component={FriendAdd} />
    </Stack.Navigator>
  );
};
