import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { FormLogin } from '../../../components/auth/FormLogin';
import {startLogin} from '../../../actions/auth';

import '@testing-library/jest-dom';

jest.mock('../../../actions/auth', () => ({
  startLogin: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <FormLogin />
  </Provider>,
);

describe('Pruebas en <FormLogin/>', () => {
  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de llamar el dispatch del login', () => {
    wrapper.find('input[name="email"]').simulate('change', {
      target: {
        name: 'email',
        value: 'test@test.com',
      },
    });

    wrapper.find('input[name="password"]').simulate('change', {
      target: {
        name: 'password',
        value: 'password',
      },
    });

    wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

    expect(startLogin).toHaveBeenCalledWith('test@test.com', 'password');
  });
});
