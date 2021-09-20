import { combineReducers } from 'redux';
import { uiReducer } from './uiReducers';

export const rootReducers = combineReducers({
  ui: uiReducer,
  // TODO: authReducer
  // TODO: calendarReducer
});
