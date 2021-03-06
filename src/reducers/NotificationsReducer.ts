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
      const { user } = action.payload;
      return {
        ...state,
        friendRequests: [...state.friendRequests, user],
      };

    case types.REQUEST_RESPONSE: {
      return {
        ...state,
        friendRequests: _.remove(state.friendRequests, request => {
          return request.uid !== action.payload.uid;
        }),
      };
    }
    default:
      return { ...state };
  }
};
