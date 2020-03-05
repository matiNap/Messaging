import { AppThunk } from '_types';
import database from '_apis/database';
import reactotron from 'reactotron-react-native';
import * as firebase from 'firebase';
import * as types from '../chat';

export const fetchNewMessages = (): AppThunk => async (
  dispatch,
  getState,
) => {
  const uid = getState().app.user.uid;

  const friendsSnapshot = await firebase
    .database()
    .ref(`users/${uid}/friends`)
    .once('value');
  const friendsList = Object.entries(friendsSnapshot.val());

  for (const [friendUid] of friendsList) {
    const userSnapshot = await firebase
      .database()
      .ref(`users/${friendUid}`)
      .once('value');
    const toReadResponse = await database.get(
      `chat/lastReaded/${uid}?withUid=${friendUid}`,
    );
    const toRead = toReadResponse.data;
    const {
      name,
      photoURL,
      online,
      displayName,
      fName,
    } = userSnapshot.val();
    firebase
      .database()
      .ref(`chat/${uid}/messages/${friendUid}`)
      .limitToLast(10)
      .on('child_added', snapshot => {
        const message = snapshot.val();

        if (message.createdAt - toRead > 0) {
          dispatch({
            type: types.FETCH_NEW_MESSAGE,
            payload: {
              message,
              user: {
                name,
                photoURL,
                online,
                displayName,
                uid: friendUid,
                fName,
              },
            },
          });
        }
      });
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
  const response = await database.post(
    `chat/lastReaded/${uid}?withUid=${friendUid}`,
    { content: text },
  );
};

// {
//   _id: 1,
//   text: 'It is example message.',
//   createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
//   isTyping: true,
//   user: {
//     _id: 2,
//     name: 'React Native',
//     avatar:
//       'https://ramcotubular.com/wp-content/uploads/default-avatar.jpg',
//   },
// },
