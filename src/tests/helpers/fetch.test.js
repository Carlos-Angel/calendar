import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';

describe('Pruebas en fetch', () => {
  let token = '';

  test('fetchWithoutToken debe de funcionar', async () => {
    const resp = await fetchWithoutToken(
      'auth/login',
      { email: 'test@test.com', password: 'password' },
      'POST',
    );
    const body = await resp.json();
    token = body.token;

    expect(resp instanceof Response).toBe(true);
    expect(body.ok).toBe(true);
  });

  test('fetchWithToken debe de funcionar', async () => {
    localStorage.setItem('token', token);

    const resp = await fetchWithToken('event/6160df8ea0a628ad65fb891e');
    const body = await resp.json();

    expect(body.ok).toBe(true);
    expect(body.msg).toBe('event found');
  });
});
