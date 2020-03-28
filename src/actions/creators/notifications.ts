import database from '_apis/database';
import * as types from '../notifications';
import { AppThunk } from 'types';
import reactotron from 'reactotron-react-native';
import { getFriendsRef } from '_apis/firestore';
import * as firestore from '_apis/firestore';
import firebase from 'firebase';

export const sendFriendRequest = (
  toUid: string,
  onSucces: Function,
  onFailed: Function,
): AppThunk => async (dispatch, getState) => {
  try {
    const fromUid = getState().app.user.uid;
    await database.post(`friendRequest/${toUid}?fromUid=${fromUid}`);
    onSucces();
  } catch (error) {
    onFailed();
  }
};

export const listenFriendRequests = (): AppThunk => async (
  dispatch,
  getState,
) => {
  try {
    const { uid } = firestore.getUserData();
    const response = firebase
      .database()
      .ref(`friends/${uid}`)
      .on('child_added', snapshot => {
        reactotron.log(snapshot);
      });

    dispatch({
      type: types.LISTEN_FRIEND_REQUESTS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const acceptRequest = (fromUid: string): AppThunk => (
  dispatch,
  getState,
) => {
  const toUid = getState().app.user.uid;
  database.post('acceptRequest', { toUid, fromUid });

  dispatch({
    type: types.REQUEST_RESPONSE,
    payload: {
      uid: fromUid,
    },
  });
};

export const rejectRequest = (fromUid: string): AppThunk => (
  dispatch,
  getState,
) => {
  const toUid = getState().app.user.uid;
  database.post('rejectRequest', { toUid, fromUid });
  dispatch({
    type: types.REQUEST_RESPONSE,
    payload: {
      uid: fromUid,
    },
  });
};
