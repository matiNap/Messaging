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
  return {
    type: types.REQUEST_RESPONSE,
    payload: {
      uid: fromUid,
      state: 'friends',
    },
  };
};

export const rejectRequest = (fromUid: string) => {
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

export const fetchOnlineUsers = (): AppThunk => async dispatch => {
  const { uid } = firestore.getUserData();

  try {
    firebase
      .database()
      .ref(`friends/${uid}`)
      .orderByValue()
      .equalTo('friends')
      .on('child_added', async snapshot => {
        const friendUid = snapshot.key;
        firestore.getUserRef(friendUid).onSnapshot(userSnapshot => {
          dispatch({
            type: types.FETCH_ONLINE_USERS,
            payload: {
              user: userSnapshot.data(),
            },
          });
        });
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
): AppThunk => async dispatch => {
  try {
    const { uid } = firestore.getUserData();
    const snapshot = await firebase
      .database()
      .ref(`friends/${uid}`)
      .orderByValue()
      .equalTo('friends')
      .once('value');

    const data = [];
    for (const key of Object.keys(snapshot.val())) {
      reactotron.log(key);
      const user = await firestore.getUserRef(key).get();
      reactotron.log(user.data());
      data.push(user.data());
    }
    onSucces();
    dispatch({
      type: types.SEARCH_OWN_FRIENDS,
      payload: data,
    });
  } catch (error) {
    onFailed();
  }
};

export const deleteSearchedOwnFriends = () => {
  return { type: types.DELETE_SEARCHED_OWN_FRIENDS };
};
