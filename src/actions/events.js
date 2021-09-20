import { types } from '../types';

export const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActive = (event) => ({
  type: types.eventCleanActive,
});

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});
