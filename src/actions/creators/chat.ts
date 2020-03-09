import { AppThunk } from '_types';
import database from '_apis/database';
import reactotron from 'reactotron-react-native';
import * as firebase from 'firebase';
import * as types from '../chat';

export const fetchNewMessages = (
  onFailed: Function,
): AppThunk => async (dispatch, getState) => {
  const uid = getState().app.user.uid;
  const { sended } = getState().chat;

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
          reactotron.log(snapshot.val());
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
      firebase
        .database()
        .ref(`chat/${uid}/messages/${friendUid}`)
        .limitToLast(10)
        .on('child_added', snapshot => {
          const message = snapshot.val();
          const user = {
            name,
            photoURL,
            online,
            displayName,
            uid: friendUid,
            fname: fName,
          };

          if (!sended && message.uid !== uid) {
            dispatch({
              type: types.FETCH_NEW_MESSAGE,
              payload: {
                message: {
                  ...message,

                  user: {
                    ...user,
                    _id: message._id === uid ? 1 : 2,
                  },
                },
                user,
                toRead: toReadSnapshot.val(),
              },
            });
          }
        });
    }
  } catch (error) {
    onFailed();
  }
};

export const sendMessage = (
  text: string,
  friendUid: string,
): AppThunk => async (dispatch, getState) => {
  const { uid } = getState().app.user;
  const response = await database.post(
    `chat/${friendUid}?withUid=${uid}`,
    {
      content: text,
    },
  );

  dispatch({
    type: types.SEND_MESSAGE,
    payload: {
      uid: friendUid,
      message: response.data,
    },
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
