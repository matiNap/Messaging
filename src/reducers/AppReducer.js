import { REHYDRATE } from "redux-persist/es/constants";

const initState = {
  user: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      return { ...state };
    }
    default:
      return { ...state };
  }
};
