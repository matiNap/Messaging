import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import NotificationsReducer from './NotificationsReducer';
import UsersReducer from './UsersReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  notifications: NotificationsReducer,
  users: UsersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
