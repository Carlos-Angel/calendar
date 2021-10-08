import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';
import { startRegister } from '../../actions/auth';

export const FormRegister = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formValues;

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
    } else {
      dispatch(startRegister(email, password, name));
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Nombre'
          name='name'
          value={name}
          onChange={handleInputChange}
        />
      </div>
      <div className='form-group'>
        <input
          type='email'
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
        <input
          type='password'
          className='form-control'
          placeholder='Confirmar contraseña'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleInputChange}
        />
      </div>

      <div className='form-group'>
        <input type='submit' className='btnSubmit' value='Crear cuenta' />
      </div>
    </form>
  );
};
