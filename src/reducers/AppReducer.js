import { REHYDRATE } from "redux-persist/es/constants";
import * as types from "_actions/app";

const initState = {
  user: {
    signedIn: false,
    token: null
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      return { ...state };
    }
    case types.SIGN_IN: {
      return { ...state, user: action.payload };
    }
    case types.SIGN_OUT: {
      return { ...state, user: null };
    }
    case types.CHECK_AUTH: {
      return {
        ...state,
        user: {
          ...state.user,
          token: action.payload.token
        }
      };
    }
    default:
      return { ...state };
  }
};
