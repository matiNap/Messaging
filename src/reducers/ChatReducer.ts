import * as types from '_actions/chat';
import { REHYDRATE } from 'redux-persist/es/constants';
import _ from 'lodash';

interface ChatState {
  chats: object;
  sended: boolean;
  persistedChats: object;
}

const initState: ChatState = {
  chats: null,
  sended: false,
  persistedChats: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        persistedChats: action.payload?.chat?.chats,
      };
    }
    case types.FETCH_NEW_MESSAGE: {
      const { uid } = action.payload.user;
      const chats = state.chats ? state.chats : {};
      const { message } = action.payload;
      const oldMessages =
        state.chats && state.chats[uid] && state.chats[uid].messages
          ? state.chats[uid].messages
          : [];

      return {
        ...state,
        chats: {
          ...chats,
          [uid]: {
            messages: [...oldMessages, message],
            user: action.payload.user,
            latestMessage: message,
            toRead: action.payload.toRead,
          },
        },
      };
    }
    case types.CHANGE_READED: {
      const { friendUid, value } = action.payload;
      const { chats } = state;
      return {
        ...state,
        chats: {
          ...chats,
          [friendUid]: {
            ...chats[friendUid],
            toRead: value,
          },
        },
      };
    }
    case types.CLEAR_MESSAGES: {
      return { ...state, chats: {} };
    }
    default:
      return { ...state };
  }
};
