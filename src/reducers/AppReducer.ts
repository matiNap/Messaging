import { REHYDRATE } from 'redux-persist/es/constants';
import * as types from '_actions/app';
import reactotron from 'reactotron-react-native';
import { User } from '_types';

interface AppState {
  user: User;
  tabButtonChecked: {
    latest: boolean;
    online: boolean;
  };
}

const initState: AppState = {
  user: {
    signedIn: false,
    token: null,
  },
  tabButtonChecked: {
    latest: true,
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      const { user } = action.payload.app
        ? action.payload.app
        : initState.user;
      return { ...state, user };
    }
    case types.SIGN_IN: {
      return {
        ...state,
        user: { ...action.payload, signedIn: true },
      };
    }
    case types.SIGN_OUT: {
      return { ...initState };
    }
    case types.CHECK_AUTH: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    }
    case types.PRESS_TAB_BAR: {
      return {
        ...state,
        tabButtonChecked: {
          [action.payload]: true,
        },
      };
    }
    default:
      return { ...state };
  }
};
