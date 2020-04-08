import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Main';
import Auth from './Auth';
import { navigationRef } from '_navigation';
import { connect } from 'react-redux';
import { User } from '_types';
import { RootState } from '_rootReducer';

const Stack = createStackNavigator();

interface Props {
  user: User;
}

const AppContainer = (props: Props) => {
  const { user } = props;
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="main" component={Main} />
        ) : (
          <Stack.Screen name="auth" component={Auth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.app.user,
  };
};

export default connect(mapStateToProps)(AppContainer);
