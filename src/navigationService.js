import { NavigationActions } from 'react-navigation';
import reactotron from 'reactotron-react-native';

let _navigator;

export const setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef;
};

export const navigate = (routeName, params) => {
  if (_navigator) {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  }
};
