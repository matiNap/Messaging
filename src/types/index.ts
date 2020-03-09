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
};

export type UserChat = {
  name: string;
  photoURL: string;
  online: boolean;
  displayName: string;
  uid: string;
  fname: string;
};

export type Message = {
  _id: string;
  createdAt: number;
  text: string;
  iid: string;
};

export type ChatData = {
  user: UserChat;
  messages: Message[];
  latestMessage: Message;
  toRead: number;
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
