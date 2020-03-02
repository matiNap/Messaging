import React from 'react';
import { BottomTabBar } from 'react-navigation-tabs';
import { StyleSheet } from 'react-native';
import palette from '_palette';
import metrics from '_metrics';

const TabBarComponent = props => <BottomTabBar {...props} />;

const TabBar = props => {
  return <TabBarComponent {...props} style={styles.tabBar} />;
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: palette.secondary,
    borderTopColor: palette.grayscale.medium,
    borderTopWidth: 0.4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    justifyContent: 'space-around',

    padding: metrics.padding.normal,
  },
});

export default TabBar;
