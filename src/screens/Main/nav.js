import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Latest from './Latest';
import Online from './Online';
import TabBarComponent from './components/TabBarComponent';
import LatestButton from './components/LatestButton';
import OnlineButton from './components/OnlineButton';

export default createBottomTabNavigator(
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
);
