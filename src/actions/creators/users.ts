import * as types from '_actions/users';
import { AppThunk } from '_types';
import database from '_apis/database';

export const searchUser = (
  text: string,
  onSucces: Function,
  onFailed: Function,
): AppThunk => async (dispatch, getState) => {
  try {
    const searchedBy = getState().app.user.uid;

    const response = await database.get(
      `searchUser?name=${text}&limit=${10}&searchedBy=${searchedBy}`,
    );

    onSucces();
    dispatch({
      type: types.SEARCH_USER,
      payload: response.data,
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
  database.post(`friendRequest/${toUid}?fromUid=${fromUid}`);
  dispatch({
    type: types.ADD_USER,
    payload: { uid: toUid },
  });
};

export const acceptRequest = (fromUid: string) => {
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
