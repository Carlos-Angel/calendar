import React from 'react';
import { FormLogin } from './FormLogin';
import { FormRegister } from './FormRegister';

import './login.css';

export const LoginScreen = () => {
  return (
    <div className='container login-container'>
      <div className='row'>
        <div className='col-md-6 login-form-1'>
          <h3>Ingreso</h3>
          <FormLogin />
        </div>

        <div className='col-md-6 login-form-2'>
          <h3>Registro</h3>
          <FormRegister />
        </div>
      </div>
    </div>
  );
};
