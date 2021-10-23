import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { FormRegister } from '../../../components/auth/FormRegister';
import { startRegister } from '../../../actions/auth';

import '@testing-library/jest-dom';

jest.mock('../../../actions/auth', () => ({
  startRegister: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <FormRegister />
  </Provider>,
);

describe('Pruebas en <FormRegister/>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de lanzar mensaje de error si las contraseñas son diferentes', () => {
    wrapper.find('input[name="email"]').simulate('change', {
      target: {
        name: 'password',
        value: 'password',
      },
    });

    wrapper.find('input[name="confirmPassword"]').simulate('change', {
      target: {
        name: 'confirmPassword',
        value: 'password2',
      },
    });

    wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Las contraseñas no coinciden',
      'error',
    );
  });

  test('debe de registrarse si las contraseñas son iguales', () => {
    wrapper.find('input[name="email"]').simulate('change', {
      target: {
        name: 'password',
        value: 'password',
      },
    });

    wrapper.find('input[name="confirmPassword"]').simulate('change', {
      target: {
        name: 'confirmPassword',
        value: 'password',
      },
    });

    wrapper.find('input[name="email"]').simulate('change', {
      target: {
        name: 'email',
        value: 'test@test.com',
      },
    });

    wrapper.find('input[name="name"]').simulate('change', {
      target: {
        name: 'name',
        value: 'test',
      },
    });

    wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

    expect(startRegister).toHaveBeenCalledWith(
      'test@test.com',
      'password',
      'test',
    );
    expect(Swal.fire).not.toHaveBeenCalled();
  });
});
