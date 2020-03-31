import * as types from '_actions/chat';
import { REHYDRATE } from 'redux-persist/es/constants';
import _ from 'lodash';
import { Message, User } from '_types';
import reactotron from 'reactotron-react-native';
import * as firestore from '_apis/firestore';

interface ChatState {
  toSend: Message[];

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
      return {
        ...state,
        persistedChats: action.payload?.chat?.messages,
      };
    }

    case types.SEND_MESSAGE: {
      const { friendUid, message, user } = action.payload;
      const myUid = firestore.getUserData().uid;
      return {
        ...state,
        persistedChats: null,
        chats: _.update(state.chats, `[${friendUid}]`, src => {
          const latestMessage = {
            ...message,
            sendedBy: message === myUid,
          };
          if (src) {
            const prevMessages = src.messages ? src.messages : [];

            return {
              ...src,
              user,
              messages: [...prevMessages, message],
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
    //Send this messsages when didMount on Latest
    case types.SEND_MESSAGE_OFFLINE: {
      const { friendUid, message } = action.payload;

      return {
        ...state,
        // toSend: {
        //   ...state.messages,
        //   [friendUid]: [...state.toSend, message],
        // },
      };
    }

    default:
      return { ...state };
  }
};
