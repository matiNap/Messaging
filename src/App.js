import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { View } from 'react-native';
import { StyleProvider } from 'native-base';

import { SafeAreaProvider } from 'react-native-safe-area-view';
import getTheme from './native-base-theme/components';
import AppContainer from './screens/AppContainer';
import { store, persistor } from './store';
import reactotron from 'reactotron-react-native';
import * as firebase from 'firebase';
import firebaseConfig from './firebase_config';

console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    try {
      firebase.initializeApp(firebaseConfig);
    } catch (error) {
      console.log(error);
    }
    if (!this.state.fontLoaded) {
      await Font.loadAsync({
        prompt: require('./assets/fonts/Prompt.ttf'),
        rubik: require('./assets/fonts/rubik.ttf'),
      });
      this.setState({ fontLoaded: true });
    }
  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <SafeAreaProvider>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <StyleProvider style={getTheme()}>
                <AppContainer />
              </StyleProvider>
            </PersistGate>
          </Provider>
        </SafeAreaProvider>
      );
    }
    return <View />;
  }
}
