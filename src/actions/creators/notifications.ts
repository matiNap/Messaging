import database from '_apis/database';
import * as types from '../notifications';
import { AppThunk } from 'types';
import reactotron from 'reactotron-react-native';
import * as firestore from '_apis/firestore';
import firebase from 'firebase';

// export const sendFriendRequest = (
//   toUid: string,
//   onSucces: Function,
//   onFailed: Function,
// ): AppThunk => async (dispatch, getState) => {
//   try {
//     const fromUid = getState().app.user.uid;
//     await database.post(`friendRequest/${toUid}?fromUid=${fromUid}`);
//     onSucces();
//   } catch (error) {
//     onFailed();
//   }
// };

export const listenFriendRequests = (): AppThunk => async (
  dispatch,
  getState,
) => {
  try {
    const { uid } = firestore.getUserData();
    firebase
      .database()
      .ref(`friends/${uid}`)
      .orderByValue()
      .equalTo('invited')
      .on('child_added', async snapshot => {
        const userSnapshot = await firestore
          .getUserRef(snapshot.key)
          .get();

        dispatch({
          type: types.LISTEN_FRIEND_REQUESTS,
          payload: {
            user: userSnapshot.data(),
          },
        });
      });
  } catch (error) {
    console.log(error);
  }
};

export const acceptRequest = (
  fromUid: string,
): AppThunk => dispatch => {
  const { uid } = firestore.getUserData();
  firebase
    .database()
    .ref(`friends/${uid}/${fromUid}`)
    .set('friends');
  firebase
    .database()
    .ref(`friends/${fromUid}/${uid}`)
    .set('friends');

  dispatch({
    type: types.REQUEST_RESPONSE,
    payload: {
      uid: fromUid,
    },
  });
};

export const rejectRequest = (
  fromUid: string,
): AppThunk => dispatch => {
  const { uid } = firestore.getUserData();
  firebase
    .database()
    .ref(`friends/${uid}/${fromUid}`)
    .remove();
  dispatch({
    type: types.REQUEST_RESPONSE,
    payload: {
      uid: fromUid,
    },
  });
};
