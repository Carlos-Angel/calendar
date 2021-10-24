import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';

import '@testing-library/jest-dom';

// jest.mock('../../../actions/events', () => ({
//   eventStartDelete: jest.fn(),
// }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  calendar: {
    events: [],
    activeEvent: null,
  },
  auth: {
    uid: '123',
    name: 'test',
  },
  ui: {
    modalOpen: false,
  },
};
let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>,
);

describe('Pruebas en <CalendarScreen />', () => {
  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
