import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { AppRouter } from '../../router/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Pruebas en <AppRouter />', () => {
  test('debe de mostrar el loading Cargando...', () => {
    const initialState = {
      auth: {
        checking: true,
      },
    };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>,
    );
    expect(wrapper.find('h5').exists()).toBe(true);
  });

  test('debe de mostrar la ruta pública', () => {
    const initialState = {
      auth: {
        checking: false,
      },
    };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBe(true);
  });

  test('debe de mostrar la ruta privada', () => {
    const initialState = {
      auth: {
        checking: false,
        uid: '124',
        name: 'test',
      },
      calendar: {
        events: [],
      },
      ui: {
        modalOpen: false,
      },
    };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>,
    );

    expect(wrapper.find('.calendar-screen').exists()).toBe(true);
  });
});
