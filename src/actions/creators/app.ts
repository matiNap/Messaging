import database from '_apis/database';
import * as types from '../app';
import { AppThunk } from '_types';
import * as firestore from '_apis/firestore';
import reactotron from 'reactotron-react-native';
import firebase from 'firebase';
import navigate from '_navigation';

export const createUser = (
  userData: {
    username: string;
    email: string;
    fname: string;
    sname: string;
    password: string;
  },
  onCreate: Function,
  onFailed: Function,
) => async () => {
  try {
    await firestore.createUser(userData);

    onCreate();
  } catch (err) {
    reactotron.log(err);
    onFailed();
  }
};

export const signIn = (
  username: string,
  password: string,
  onSignInFailed: Function,
): AppThunk => async dispatch => {
  try {
    const response = await firestore.signIn({
      email: username,
      password,
    });

    navigate('loading');
    dispatch({
      type: types.SIGN_IN,
      payload: {
        ...response,
      },
    });
  } catch (error) {
    onSignInFailed('Invalid password or email');
  }
};
export const signOut = (): AppThunk => async dispatch => {
  try {
    await firebase.auth().signOut();
    dispatch({
      type: 'LOG_OUT',
    });
    navigate('login');
  } catch (error) {
    console.log(error);
  }
};
export const checkAuth = (
  onAuthFailed: Function,
) => async dispatch => {
  firebase.auth().onAuthStateChanged(async googleUser => {
    if (googleUser) {
      const userSnapshot = await firestore
        .getUserRef(googleUser.uid)
        .get();
      const user = userSnapshot.data();
      dispatch({
        type: types.CHECK_AUTH,
        payload: {
          user,
        },
      });
    } else {
      onAuthFailed();
      dispatch({
        user: null,
      });
    }
  });
  dispatch({
    type: 'none',
  });
};

export const deleteUser = async (
  uid: number,
  onDeleteFailed: Function,
) => {
  try {
    await database.post('deleteUser', { uid });
  } catch (error) {
    onDeleteFailed();
  }
};

export const pressTabBarButton = (name: string) => {
  return {
    type: types.PRESS_TAB_BAR,
    payload: name,
  };
};

export const changeStatus = (status: boolean) => {
  try {
    firestore.getCurrentUserRef().update({ online: status });
  } catch (error) {
    console.log(error);
  }
};
