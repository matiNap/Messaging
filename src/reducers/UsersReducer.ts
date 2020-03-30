import * as types from '_actions/users';
import { SearchedUser, User } from '_types';
import _ from 'lodash';
import reactotron from 'reactotron-react-native';

export interface UsersState {
  friendsOnline: User[];
  searched: SearchedUser[];
  searchedFriends: User[];
}

const initState: UsersState = {
  friendsOnline: [],
  searched: [],
  searchedFriends: [],
};

const updateArray = (arr: any[], key: any, newval: any) => {
  var match = _.find(arr, key);

  if (match) {
    var index = _.indexOf(arr, _.find(arr, key));

    arr.splice(index, 1, newval);
    reactotron.log(arr);
    return arr;
  } else {
    arr.push(newval);
    return arr;
  }
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
      const { state } = action.payload;
      return {
        ...state,
        searched: _.map(state.searched, data => {
          if (data.uid === action.payload.uid) {
            return {
              ...data,
              state,
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
      const { user } = action.payload;

      return {
        ...state,
        friendsOnline: [
          ...updateArray(
            state.friendsOnline,
            {
              uid: user.uid,
            },

            user,
          ),
        ],
      };
    }
    default:
      return { ...state };
  }
};
