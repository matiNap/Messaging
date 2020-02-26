import { REHYDRATE } from 'redux-persist/es/constants';
import * as types from '_actions/notifications';
import FriendRequest from '_interfaces/friendReqest';
import _ from 'lodash';

const initState: NotificationState = {
  friendRequests: [],
};

export interface NotificationState {
  friendRequests: FriendRequest[];
}

export default (state = initState, action): NotificationState => {
  switch (action.type) {
    case types.LISTEN_FRIEND_REQUESTS:
      return {
        ...state,
        friendRequests: action.payload,
      };
    case types.REQUEST_RESPONSE: {
      _.remove(state.friendRequests, request => {
        return request.uid === action.payload.uid;
      });
      return {
        ...state,
        friendRequests: _.remove(state.friendRequests, request => {
          return request.uid === action.payload.uid;
        }),
      };
    }
    default:
      return { ...state };
  }
};
