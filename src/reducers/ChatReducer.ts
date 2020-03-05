import * as types from '_actions/chat';
import { User } from '_types';
import reactotron from 'reactotron-react-native';

interface ChatState {
  chats: {
    uid: {
      messages: any[];
      user: User;
    };
  };
}

const initState: ChatState = {
  chats: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.FETCH_NEW_MESSAGE: {
      const { uid } = action.payload.user;
      const { message } = action.payload;
      const oldMessages =
        state.chats[uid] && state.chats[uid].messages
          ? state.chats[uid].messages
          : [];

      return {
        ...state,
        chats: {
          ...state.chats,
          [uid]: {
            messages: [...oldMessages, message],
            user: action.payload.user,
            latestMessage: message,
          },
        },
      };
    }
    case types.SEND_MESSAGE: {
      const { friendUid } = action.payload.user;
      const { message } = action.payload;
      const oldMessages =
        state.chats[friendUid] && state.chats[friendUid].messages
          ? state.chats[friendUid].messages
          : [];
      return {
        ...state,
        chats: {
          ...state.chats,
          [uid]: {
            messages: [...oldMessages, message],
            user: action.payload.user,
          },
        },
      };
    }
    default:
      return { ...state };
  }
};
