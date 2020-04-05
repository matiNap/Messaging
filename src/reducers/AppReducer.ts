import * as types from '_actions/app';
import { User } from '_types';

interface AppState {
  user: User;
  tabButtonChecked: {
    latest: boolean;
    online: boolean;
  };
}

const initState: AppState = {
  user: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.SIGN_IN: {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    case types.SIGN_OUT: {
      return { ...initState };
    }
    case types.CHECK_AUTH: {
      return {
        ...state,
        user: action.payload.user,
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
