import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from './Loading';
import Login from './Login';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="loading" component={Loading} />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
};
