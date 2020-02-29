import * as types from '_actions/notifications';
import { FriendRequest } from '_types';
import _ from 'lodash';

export interface NotificationState {
  friendRequests: FriendRequest[];
}

const initState: NotificationState = {
  friendRequests: [],
};

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
