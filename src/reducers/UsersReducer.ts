import * as types from '_actions/users';
import { User } from '_types';

export interface UsersState {
  friendsOnline: User[];
  searched: User[];
}

const initState: UsersState = {
  friendsOnline: [],
  searched: [],
};

export default (state = initState, action: any) => {
  switch (action.type) {
    case types.SEARCH_USER: {
      return { ...state, searched: action.payload };
    }
    case types.DELETE_SEARCHED: {
      return { ...state, searched: [] };
    }
    default:
      return { ...state };
  }
};
