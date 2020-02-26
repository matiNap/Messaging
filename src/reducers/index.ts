import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import NotificationsReducer from './NotificationsReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  notifications: NotificationsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
