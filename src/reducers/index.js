import { combineReducers } from 'redux';
import { uiReducer } from './uiReducers';
import { calendarReducer } from './calendarReducer';
import { authReducer } from './authReducer';

export const rootReducers = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer,
  auth: authReducer,
});
