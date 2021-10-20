import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { startLogin } from '../../actions/auth';
import { types } from '../../types';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones auth', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  test('startLogin', async () => {
    await store.dispatch(startLogin('test@test.com', 'password'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String),
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number),
    );
    // token = localStorage.setItem.mock.calls[0][1];
  });

  test('StartLogin password incorrecto', async () => {
    await store.dispatch(startLogin('test@test.com', 'password-incorrecto'));
    const actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'email or password not valid',
      'error',
    );
  });

  test('StartLogin email incorrecto', async () => {
    await store.dispatch(startLogin('test-not-exist@test.com', 'password'));
    const actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'email or password not valid',
      'error',
    );
  });
});
