import * as types from '_actions/users';
import { AppThunk } from '_types';
import database from '_apis/database';
import reactotron from 'reactotron-react-native';

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

export const fetchOnlineUsers = (): AppThunk => async (
  dispatch,
  getState,
) => {
  const { uid } = getState().app.user;
  try {
    const response = await database.get(`onlineUsers/${uid}`);
    reactotron.log(response.data);
    dispatch({
      type: types.FETCH_ONLINE_USERS,
      payload: response.data,
    });
  } catch (error) {
    reactotron.log(error.response);
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
