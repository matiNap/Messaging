import database from '_apis/database';
import * as types from '../notifications';
import { AppThunk } from '_interfaces/appThunk';

export const sendFriendRequest = (
  toUid: string,
  onSucces: Function,
  onFailed: Function,
): AppThunk => async (dispatch, getState) => {
  try {
    const fromUid = getState().app.user.uid;
    await database.post('sendFriendRequest', { fromUid, toUid });
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
    const toUid = getState().app.user.uid;
    const response = await database.post('listenFriendRequests', {
      toUid,
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