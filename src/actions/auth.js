import { types } from '../types';
import { fetchWithoutToken } from '../helpers/fetch';
import Swa from 'sweetalert2';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken(
      'auth/login',
      { email, password },
      'POST',
    );
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      console.log(body);
    }else {
      Swa.fire('Error', body.msg, 'error');
    }
  };
};

export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken(
      'auth/sign-in',
      { email, password, name },
      'POST',
    );
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(login(body.user));
    }else {
      Swa.fire('Error', body.msg, 'error');
    }
  };
}

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});
