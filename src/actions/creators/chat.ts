import { AppThunk } from '_types';
import database from '_apis/database';
import * as firebase from 'firebase';
import * as types from '../chat';
import { listenChat } from '_helpers/chat';

export const fetchNewMessages = (
  onFailed: Function,
): AppThunk => async (dispatch, getState) => {
  const uid = getState().app.user.uid;

  try {
    const friendsSnapshot = await firebase
      .database()
      .ref(`users/${uid}/friends`)
      .once('value');

    const friendsList = Object.entries(friendsSnapshot.val());

    for (const [friendUid] of friendsList) {
      await firebase
        .database()
        .ref(`chat/${friendUid}/toRead`)
        .on('child_changed', snapshot => {
          dispatch({
            type: types.CHANGE_READED,
            payload: {
              friendUid,
              value: snapshot.val(),
            },
          });
        });
    }

    for (const [friendUid] of friendsList) {
      const userSnapshot = await firebase
        .database()
        .ref(`users/${friendUid}`)
        .once('value');
      const {
        name,
        photoURL,
        online,
        displayName,
        fName,
      } = userSnapshot.val();

      const toReadSnapshot = await firebase
        .database()
        .ref(`chat/${uid}/toRead/${friendUid}`)
        .once('value');
      listenChat(uid, friendUid, (message: any) => {
        const user = {
          name,
          photoURL,
          online,
          displayName,
          uid: friendUid,
          fname: fName,
        };

        dispatch({
          type: types.FETCH_NEW_MESSAGE,
          payload: {
            message: {
              ...message,
              createdAt: new Date(message.createdAt),
              user: {
                ...user,
                _id: message.sendedBy === uid ? 1 : 2,
              },
            },
            user,
            toRead: toReadSnapshot.val(),
          },
        });
      });
    }
  } catch (error) {
    onFailed();
    console.log(error);
  }
};

export const sendMessage = (
  text: string,
  friendUid: string,
): AppThunk => async (dispatch, getState) => {
  const { uid } = getState().app.user;

  database.post(`chat/${friendUid}?withUid=${uid}`, {
    content: text,
  });
};

export const readMessage = (friendUid: string): AppThunk => async (
  dispatch,
  getState,
) => {
  const { uid } = getState().app.user;
  try {
    const response = await database.post(
      `chat/readMessage/${uid}?withUid=${friendUid}`,
    );
    dispatch({
      type: types.CHANGE_READED,
      payload: {
        friendUid,
        value: response.data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
