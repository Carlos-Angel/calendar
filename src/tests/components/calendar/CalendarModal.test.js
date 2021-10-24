import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import '@testing-library/jest-dom';

// jest.mock('../../../actions/events', () => ({
//   eventStartDelete: jest.fn(),
// }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).second(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initialState = {
  calendar: {
    events: [],
    activeEvent: {
      title: 'event title',
      notes: 'event notes',
      start: now.toDate(),
      end: nowPlus1.toDate(),
    },
  },
  auth: {
    uid: '123',
    name: 'test',
  },
  ui: {
    modalOpen: true,
  },
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>,
);

describe('Pruebas en <CalendarModal />', () => {
  test('debe de mostrarse correctamente', () => {
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });
});
