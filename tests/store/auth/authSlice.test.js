import { authSlice, clearErrorMessage, onLogin, onLogout } from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from '../../fixtures/authState.fixture';
import { testUserCredentials } from '../../fixtures/user.fixture';

describe('pruebas en authSlice', () => {
  test('debe de retornar el estado inicial', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('debe de realizar un login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test('debe de realizar el logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout());

    expect(state).toEqual(notAuthenticatedState);
  });

  test('debe de realizar el logout y regresar un mensaje de error', () => {
    const errorMessage = 'invalid credentials';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    expect(state).toEqual({ ...notAuthenticatedState, errorMessage });
  });

  test('debe de limpiar el mensaje de error', () => {
    const errorMessage = 'invalid credentials';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    const newState = authSlice.reducer(state, clearErrorMessage());

    expect(newState.errorMessage).toBe(undefined);
  });
});
