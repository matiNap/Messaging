import * as types from '_actions/users';
import { AppThunk } from '_types';
import database from '_apis/database';
import reactotron from 'reactotron-react-native';
import * as firestore from '_apis/firestore';
import firebase from 'firebase';

const requestState = async (
  currentUserUid: string,
  friendUid: string,
) => {
  const stateSnapshot = await firebase
    .database()
    .ref(`friends/${friendUid}/${currentUserUid}`)
    .once('value');
  const myStateSnapshot = await firebase
    .database()
    .ref(`friends/${currentUserUid}/${friendUid}`)
    .once('value');

  const fromFriendState = stateSnapshot.val()
    ? stateSnapshot.val()
    : null;
  const myState = myStateSnapshot.val()
    ? myStateSnapshot.val()
    : null;

  if (fromFriendState && myState) {
    return 'friends';
  } else if (fromFriendState) {
    return 'byMe';
  } else if (myState) {
    return 'byUser';
  }

  return null;
};

export const searchUser = (
  text: string,
  onSucces: Function,
  onFailed: Function,
): AppThunk => async dispatch => {
  try {
    const snapshot = await firestore
      .firestore()
      .collection('users')
      .orderBy('name')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get();

    const data = [];
    const currentUserUid = firestore.getUserData().uid;
    for (const doc of snapshot.docs) {
      const friendUid = doc.data().uid;
      if (friendUid === currentUserUid) continue;
      const state = await requestState(currentUserUid, friendUid);
      reactotron.log(state);
      data.push({ ...doc.data(), state: state ? state : 'none' });
    }

    onSucces();
    dispatch({
      type: types.SEARCH_USER,
      payload: data,
    });
  } catch (err) {
    onFailed();
  }
};

export const addUser = (toUid: string): AppThunk => (
  dispatch,
  getState,
) => {
  const fromUid = getState().app.user.uid;

  try {
    firebase
      .database()
      .ref(`friends/${toUid}/${fromUid}`)
      .set('invited');

    dispatch({
      type: types.ADD_USER,
      payload: { uid: toUid },
    });
  } catch (error) {
    reactotron.log(error);
  }
};

export const acceptRequest = (fromUid: string) => async () => {
  const { uid } = firestore.getUserData();
  firebase
    .database()
    .ref(`friends/${uid}/${fromUid}`)
    .set('friends');
  firebase
    .database()
    .ref(`friends/${fromUid}/${uid}`)
    .set('friends');
  return {
    type: types.REQUEST_RESPONSE,
    payload: {
      uid: fromUid,
      state: 'friends',
    },
  };
};

export const rejectRequest = (fromUid: string) => {
  const { uid } = firestore.getUserData();
  firebase
    .database()
    .ref(`friends/${uid}/${fromUid}`)
    .remove();

  return {
    type: types.REQUEST_RESPONSE,
    payload: {
      uid: fromUid,
      state: 'none',
    },
  };
};

export const deleteSearchedUsers = () => ({
  type: types.DELETE_SEARCHED,
});

export const fetchOnlineUsers = (): AppThunk => async (
  dispatch,
  getState,
) => {
  const { uid } = getState().app.user;
  try {
    const response = await database.get(`onlineUsers/${uid}`);

    dispatch({
      type: types.FETCH_ONLINE_USERS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_ONLINE_USERS,
      payload: [],
    });
  }
};

export const searchOwnFriends = (
  text: string,
  onSucces: Function,
  onFailed: Function,
): AppThunk => async (dispatch, getState) => {
  const searchedBy = getState().app.user.uid;
  try {
    const response = await database.get(
      `searchUser?name=${text}&limit=${20}&searchedBy=${searchedBy}&onlyFriends=1`,
    );
    onSucces();
    dispatch({
      type: types.SEARCH_OWN_FRIENDS,
      payload: response.data,
    });
  } catch (error) {
    onFailed();
  }
};

export const deleteSearchedOwnFriends = () => {
  return { type: types.DELETE_SEARCHED_OWN_FRIENDS };
};
