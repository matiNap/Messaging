import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import authNav from './Auth/nav';
import mainNav from './Main/nav';

const navigator = createSwitchNavigator({
  auth: authNav,
  main: mainNav,
});

export default createAppContainer(navigator);
