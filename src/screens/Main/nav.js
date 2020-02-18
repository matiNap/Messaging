import { createBottomTabNavigator } from 'react-navigation-tabs';
import Latest from './Latest';
import Online from './Online';

export default createBottomTabNavigator({
  online: Online,
  latest: Latest,
});
