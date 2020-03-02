import { REHYDRATE } from 'redux-persist/es/constants';
import * as types from '_actions/app';
import reactotron from 'reactotron-react-native';

const initState = {
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
      return { ...state, user: null };
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
