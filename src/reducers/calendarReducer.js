import moment from 'moment';
import { types } from '../types';

const initialState = {
  events: [
    {
      title: 'title event 01',
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      notes: 'note event',
      user: {
        _id: 'uid',
        name: 'username',
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case types.eventCleanActive:
      return {
        ...state,
        activeEvent: null,
      };
    default:
      return state;
  }
};
