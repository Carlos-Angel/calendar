const baseUrl = process.env.REACT_APP_API_URL;

export const fetchWithToken = (endpoint, data = {}, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'x-token': localStorage.getItem('token') || '',
  };

  if (method === 'GET') {
    return fetch(url, {
      method,
      headers,
    });
  } else {
    return fetch(url, {
      method,
      headers,
      body: JSON.stringify(data),
    });
  }
};

export const fetchWithoutToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`;
  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};
