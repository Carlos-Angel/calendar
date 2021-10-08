import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../actions/auth';

export const FormLogin = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  });

  const { email, password } = formValues;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startLogin(email, password));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Correo'
          name='email'
          value={email}
          onChange={handleInputChange}
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          placeholder='Contraseña'
          name='password'
          value={password}
          onChange={handleInputChange}
        />
      </div>
      <div className='form-group'>
        <input type='submit' className='btnSubmit' value='Login' />
      </div>
    </form>
  );
};
