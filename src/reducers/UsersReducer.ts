import { REHYDRATE } from 'redux-persist/es/constants';
import * as types from '_actions/users';
import { SearchedUser, User } from '_types';
import _ from 'lodash';

export interface UsersState {
  friendsOnline: User[];
  searched: SearchedUser[];
  searchedFriends: User[];
}

const initState: UsersState = {
  friendsOnline: null,
  searched: [],
  searchedFriends: [],
};

export default (state = initState, action: any) => {
  switch (action.type) {
    case REHYDRATE: {
      const { friendsOnline } =
        action.payload && action.payload.users
          ? action.payload.users
          : [];
      return { ...state, friendsOnline };
    }
    case types.SEARCH_USER: {
      return { ...state, searched: action.payload };
    }
    case types.DELETE_SEARCHED: {
      return { ...state, searched: [] };
    }
    case types.REQUEST_RESPONSE: {
      return {
        ...state,
        searched: _.map(state.searched, data => {
          if (data.uid === action.payload.uid) {
            return {
              ...data,
              ['state']: action.payload.state,
            };
          } else return data;
        }),
      };
    }
    case types.ADD_USER: {
      return {
        ...state,
        searched: _.map(state.searched, data => {
          if (data.uid === action.payload.uid) {
            return {
              ...data,
              ['state']: 'byMe',
            };
          } else return data;
        }),
      };
    }
    case types.SEARCH_OWN_FRIENDS: {
      return { ...state, searchedFriends: action.payload };
    }
    case types.DELETE_SEARCHED_OWN_FRIENDS: {
      return { ...state, searchedFriends: initState.searchedFriends };
    }
    case types.FETCH_ONLINE_USERS: {
      return { ...state, friendsOnline: action.payload };
    }
    default:
      return { ...state };
  }
};
