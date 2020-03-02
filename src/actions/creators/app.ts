import database from '_apis/database';
import * as types from '../app';
import { navigate } from '_navigation';
import reactotron from 'reactotron-react-native';
import { AppThunk } from '_types';

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
  // onCreate();

  try {
    const response = await database.post('createUser', {
      ...userData,
    });
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
    const response = await database.post('signIn', {
      email: username,
      password,
    });

    const { data } = response;
    navigate('latest');
    dispatch({
      type: types.SIGN_IN,
      payload: {
        ...data,
      },
    });
  } catch (error) {
    onSignInFailed('Invalid password or email');
  }
};
export const signOut = (onFailed: Function): AppThunk => async (
  dispatch,
  getState,
) => {
  const state = getState();
  try {
    const { uid } = state.app.user;
    await database.post('signOut', { uid });
  } catch (error) {
    onFailed();
  }
};
export const checkAuth = (
  onAuthSucces: Function,
  onAuthFailed: Function,
): AppThunk => async (dispatch, getState) => {
  const state = getState();
  console.log('Check');
  try {
    const { token, uid } = state.app.user;
    const response = await database.post('checkAuth', { uid, token });
    const { data } = response;
    const { newToken } = data;
    onAuthSucces();
    dispatch({
      type: types.CHECK_AUTH,
      payload: {
        ...data,
        token: newToken,
      },
    });
  } catch (error) {
    onAuthFailed();
  }
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
