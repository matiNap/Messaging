import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import NotificationsReducer from './NotificationsReducer';
import UsersReducer from './UsersReducer';
import ChatReducer from './ChatReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  notifications: NotificationsReducer,
  users: UsersReducer,
  chat: ChatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
