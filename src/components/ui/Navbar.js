import React from 'react';
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);

  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
      <span className='navbar-brand'>{name}</span>
      <button className='btn btn-outline-danger'>
        <i className='fas fa-sign-out-alt' />
        <span>&nbsp;logout</span>
      </button>
    </div>
  );
};
