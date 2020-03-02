import * as types from '_actions/users';
import { User } from '_types';
import _ from 'lodash';

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
    default:
      return { ...state };
  }
};
