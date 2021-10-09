import { types } from '../types';
import { fetchWithToken } from '../helpers/fetch';

export const startEventAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    try {
      const resp = await fetchWithToken('event', event, 'POST');
      const body = await resp.json();
      if (body.ok) {
        const { id } = body.event;

        const user = {
          _id: uid,
          name,
        };

        dispatch(eventAddNew({ ...event, id, user }));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
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

export const eventDeleted = () => ({
  type: types.eventDeleted,
});
