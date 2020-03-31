import { AppThunk, Message } from '_types';
import * as database from '_apis/database';
import * as types from '../chat';
import * as firestore from '_apis/firestore';
// import TokenGenerator from 'uuid-token-generator';
import reactotron from 'reactotron-react-native';

const sendChatMessage = async (
  uidA: string,
  uidB: string,
  message: Message,
) => {
  return new Promise(async (res, rej) => {
    try {
      await database
        .getChatRef(`${uidA}/${uidB}/messages`)
        .push(message);
      await database
        .getChatRef(`${uidB}/${uidA}/messages`)
        .push(message);

      res(message);
    } catch (error) {
      rej(error);
    }
  });
};

export const sendMessage = (
  text: string,
  friendUid: string,
  _id: string,
): AppThunk => async dispatch => {
  const { uid } = firestore.getUserData();

  const message: Message = {
    text,
    createdAt: new Date().toString(),
    _id,
    user: {
      _id: uid,
    },
  };

  try {
    await sendChatMessage(uid, friendUid, message);
  } catch (error) {
    reactotron.log(error);
    const data = {
      message,
      friendUid,
    };
    dispatch({
      type: types.SEND_MESSAGE_OFFLINE,
      payload: data,
    });
  }
};

const toLocalMessage = (message: Message, myUid: string): Message => {
  return {
    ...message,
    user: {
      ...message.user,
      _id: myUid === message.user._id ? 1 : 2,
    },
  };
};

export const fetchNewMessages = (
  onFailed: Function,
): AppThunk => async (dispatch, getState) => {
  const { uid } = firestore.getUserData();

  try {
    // TODO: Add init chat for user
    const chatsSnapshot = await database
      .getChatRef(`${uid}`)
      .once('value');

    chatsSnapshot.forEach(async currentChatSnapshot => {
      const friendUid = currentChatSnapshot.key;
      const userSnapshot = await firestore
        .getUserRef(friendUid)
        .get();

      const user = userSnapshot.data();
      database
        .getChatRef(`${uid}/${friendUid}/messages`)
        .on('child_added', messageSnapshot => {
          const messageData = messageSnapshot.val();
          const message = toLocalMessage(
            {
              ...messageData,
              user: {
                ...messageData.user,
                ...user,
              },
            },
            uid,
          );

          reactotron.log(message);
          dispatch({
            type: types.SEND_MESSAGE,
            payload: {
              message,
              friendUid,
              user,
            },
          });
        });
    });
  } catch (error) {
    onFailed();
    reactotron.log(error);
  }
};

export const readMessage = (
  friendUid: string,
): AppThunk => async dispatch => {
  try {
  } catch (error) {
    console.log(error);
  }
};
