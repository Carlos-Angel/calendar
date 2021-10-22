import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/events';
import '@testing-library/jest-dom';

jest.mock('../../../actions/events', () => ({
  eventStartDelete: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>,
);

describe('Pruebas en <DeleteEventFab />', () => {
  test('snapshot <DeleteEventFab />', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de llamar el eventStartDelete al hacer click', () => {
    const click = wrapper.find('button').prop('onClick');
    click();

    expect(eventStartDelete).toHaveBeenCalled();
  });
});
