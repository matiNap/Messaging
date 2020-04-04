import { AppThunk, Message, User } from '_types';
import * as database from '_apis/database';
import * as types from '../chat';
import * as firestore from '_apis/firestore';
import reactotron from 'reactotron-react-native';
import firebase from 'firebase';
import NetInfo from '@react-native-community/netinfo';
import _ from 'lodash';

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
    dispatch({
      type: types.SEND_MESSAGE_OFFLINE,
      payload: {
        message,
      },
    });
  }
};

export const sendNotSended = (): AppThunk => async (
  dispatch,
  getState,
) => {
  const { uid } = firestore.getUserData();
  NetInfo.fetch().then(state => {
    if (state.isConnected) {
      const { toSend } = getState().chat;
      toSend.forEach(async message => {
        try {
          await sendChatMessage(uid, message.user._id, message);
          dispatch({
            type: types.CLEAR_TO_SEND,
          });
        } catch (error) {
          reactotron.log(error);
        }
      });
    }
  });
};

const toLocalMessage = (
  message: Message,
  myUid: string,
  friendData: User,
  currentUserData: User,
): Message => {
  const user =
    message.user._id === currentUserData.uid
      ? currentUserData
      : friendData;
  return {
    ...message,
    user: {
      ...user,
      _id: myUid === message.user._id ? 1 : 2,
    },
  };
};

const isReaded = (readedDate: string, latestMessage: Message) => {
  if (latestMessage) {
    const { createdAt } = latestMessage;
    const readedTime = new Date(readedDate).getTime();
    const createdTime = new Date(createdAt).getTime();
    if (readedTime - createdTime >= 0) {
      return true;
    }
    return false;
  }
  return false;
};

export const fetchNewMessages = (
  onFailed: Function,
): AppThunk => async (dispatch, getState) => {
  const { user } = getState().app;
  const { uid } = firestore.getUserData();

  try {
    const onUpdateMessage = (
      messageSnapshot: firebase.database.DataSnapshot,
      friendData: User,
    ) => {
      const friendUid = friendData.uid;

      const messageData = messageSnapshot.val();

      const message = toLocalMessage(
        messageData,
        uid,
        friendData,
        user,
      );

      if (messageData.user._id !== uid) {
        dispatch({
          type: types.UPDATE_READED,
          payload: {
            readed: {
              byMe: false,
            },
            friendUid,
          },
        });
      }

      dispatch({
        type: types.SEND_MESSAGE,
        payload: {
          message,
          friendUid,
          user: friendData,
        },
      });
    };

    const onUpdateReaded = (
      readedSnapshot: firebase.database.DataSnapshot,
      friendUid: string,
    ) => {
      const readedValues = readedSnapshot.val();
      const userReaded = readedValues[friendUid];
      const myReaded = readedValues[uid];
      const currentChat = getState().chat.chats[friendUid];

      const latestMessage =
        currentChat && currentChat.latestMessage
          ? currentChat.latestMessage
          : null;

      dispatch({
        type: types.UPDATE_READED,
        payload: {
          readed: {
            byUser: userReaded
              ? isReaded(userReaded, latestMessage)
              : false,
            byMe: userReaded
              ? isReaded(myReaded, latestMessage)
              : false,
          },
          friendUid,
        },
      });
    };

    firebase
      .database()
      .ref('chats')
      .child(uid)
      .on('child_added', async currentChatSnapshot => {
        const friendUid = currentChatSnapshot.key;
        const userSnapshot = await firestore
          .getUserRef(friendUid)
          .get();

        const friendData = userSnapshot.data();
        database
          .getChatRef(`${uid}/${friendUid}/messages`)
          .on('child_added', messageSnapshot => {
            onUpdateMessage(messageSnapshot, friendData);
          });

        database
          .getChatRef(`${uid}/${friendUid}/readed`)
          .on('child_changed', readedSnapshot => {
            onUpdateReaded(readedSnapshot, friendUid);
          });

        database
          .getChatRef(`${uid}/${friendUid}/readed`)
          .on('value', readedSnapshot => {
            onUpdateReaded(readedSnapshot, friendUid);
          });
      });
  } catch (error) {
    onFailed();
    reactotron.log(error);
  }
};
const NEXT_LENGTH = 2;
export const fetchChatOnScroll = (
  friendUid: string,
): AppThunk => async (dispatch, getState) => {
  const currentChat = getState().chat.chats[friendUid];
  const currentlength = currentChat.messages.length;
  const { uid } = firestore.getUserData();
  try {
    const newLength = currentlength + NEXT_LENGTH;
    const snapshot = await database
      .getChatRef(`${uid}/${friendUid}/messages`)
      .limitToFirst(newLength)
      .once('value');

    // dispatch({
    //   type: types.FETCH_ON_SCROLL,
    //   payload: {
    //     messages: _.dropRight(
    //       Object.values(snapshot.val()),
    //       currentlength,
    //     ),
    //     friendUid,
    //   },
    // });
  } catch (error) {
    reactotron.log(error.message);
  }
};

export const readMessage = (
  friendUid: string,
): AppThunk => async dispatch => {
  try {
    const { uid } = firestore.getUserData();
    dispatch({
      type: types.UPDATE_READED,
      payload: {
        readed: {
          byMe: true,
        },
        friendUid,
      },
    });
    await database.getChatRef(`${friendUid}/${uid}/readed`).update({
      [uid]: new Date().toString(),
    });
    await database.getChatRef(`${uid}/${friendUid}/readed`).update({
      [uid]: new Date().toString(),
    });
  } catch (error) {
    console.log(error);
  }
};
