import { combineReducers } from 'redux';
import { uiReducer } from './uiReducers';
import { calendarReducer } from './calendarReducer';

export const rootReducers = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer,
  // TODO: authReducer
});
