import * as types from '_actions/chat';
import { REHYDRATE } from 'redux-persist/es/constants';
import _ from 'lodash';
import { LocalMessage } from '_types';
import reactotron from 'reactotron-react-native';
import * as firestore from '_apis/firestore';

interface ChatState {
  toSend: LocalMessage[];
  persistedChats: object | null;
  chats: object;
}

const initState: ChatState = {
  toSend: [],
  persistedChats: null,
  chats: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      const chat =
        action.payload && action.payload.chat
          ? action.payload.chat
          : initState;
      return {
        ...state,
        persistedChats: chat.chats,
        toSend: chat.toSend,
      };
    }

    case types.FETCH_ON_SCROLL: {
      const { friendUid, messages } = action.payload;
      return {
        ...state,
        chats: _.update(
          state.chats,
          `[${friendUid}].messages`,
          src => {
            return [...messages, ...src];
          },
        ),
      };
    }

    case types.SEND_MESSAGE: {
      const { friendUid, message, user } = action.payload;

      return {
        ...state,
        persistedChats: null,
        chats: _.update(state.chats, `[${friendUid}]`, src => {
          const latestMessage = {
            ...message,
          };
          if (src) {
            const prevMessages = src.messages ? src.messages : [];

            return {
              ...src,
              user,
              messages: [message, ...prevMessages],
              latestMessage,
            };
          } else {
            return {
              latestMessage,
              messages: [message],
              user,
            };
          }
        }),
      };
    }
    case types.UPDATE_READED: {
      const { friendUid, readed } = action.payload;

      return {
        ...state,
        chats: _.update(state.chats, `[${friendUid}]`, src => {
          if (src) {
            return { ...src, ...readed };
          } else
            return {
              ...readed,
            };
        }),
      };
    }
    case types.CLEAR_TO_SEND: {
      return {
        ...state,
        toSend: initState.toSend,
      };
    }
    case types.SEND_MESSAGE_OFFLINE: {
      const { message } = action.payload;

      return {
        ...state,
        toSend: [...state.toSend, message],
      };
    }

    default:
      return { ...state };
  }
};
