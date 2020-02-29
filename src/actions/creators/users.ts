import * as types from '_actions/users';
import { AppThunk } from '_types';
import database from '_apis/database';

export const searchUser = (
  text: string,
  onSucces: Function,
  onFailed: Function,
): AppThunk => async dispatch => {
  try {
    const response = await database.get(
      `searchUser?name=${text}&limit=${10}`,
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

export const deleteSearchedUsers = () => ({
  type: types.DELETE_SEARCHED,
});
