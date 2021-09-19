import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const now = moment().minutes(0).second(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());

  const handleStartEvent = (e) => {
    setDateStart(e);
    setFormValues({ ...formValues, start: e });
  };

  const handleEndEvent = (e) => {
    setDateEnd(e);
    setFormValues({ ...formValues, end: e });
  };

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate(),
  });

  const { notes, title } = formValues;
  const handleInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const closeModal = () => {
    console.log('close');
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <Modal
      isOpen={true}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className='modal'
      overlayClassName='modal-fondo'
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className='container' onSubmit={handleOnSubmit}>
        <div className='form-group'>
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartEvent}
            value={dateStart}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndEvent}
            value={dateEnd}
            className='form-control'
            minDate={dateStart}
          />
        </div>

        <hr />
        <div className='form-group'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className='form-control'
            placeholder='Título del evento'
            name='title'
            value={title}
            onChange={handleInputChange}
            autoComplete='off'
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripción corta
          </small>
        </div>

        <div className='form-group'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Información adicional
          </small>
        </div>

        <button type='submit' className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
