import { ThunkAction } from 'redux-thunk';
import { RootState } from '_rootReducer';
import { Action } from 'redux';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type User = {
  email: string;
  displayName: string;
  fname: string;
  sname: string;
  name: string;
  online: boolean;
  photoURL: string;
  uid: string;
};

export type UserChat = {
  name: string;
  photoURL: string;
  online: boolean;
  displayName: string;
  uid: string;
  fname: string;
};

export type LocalMessage = {
  text: string;
  createdAt: string;
  _id: string;
  user: {
    _id: string | number;
    fname: string;
    name: string;
    email: string;
    photoURL: string;
    sname: string;
    uid: string;
  };
};

export type Message = {
  text: string;
  createdAt: string;
  _id: string;
  user: {
    _id: string | number;
  };
};

export type ChatData = {
  user: UserChat;
  messages: Message[];
  latestMessage: Message;
  byMe: boolean;
  byUser: boolean;
};

export type FriendRequest = {
  name: string;
  uid: string;
  photoURL: string;
};

export type FriendRequestState =
  | 'byUser'
  | 'friends'
  | 'byMe'
  | 'none';

export type SearchedUser = {
  uid: string;
  state: FriendRequestState;
  name: string;
  photoURL: string;
};
