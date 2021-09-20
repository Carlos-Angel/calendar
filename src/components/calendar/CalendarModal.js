import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Modal from 'react-modal';
import Sawl from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import {
  eventAddNew,
  eventClearActive,
  eventUpdated,
} from '../../actions/events';

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

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1.toDate(),
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const handleStartEvent = (e) => {
    setDateStart(e);
    setFormValues({ ...formValues, start: e });
  };

  const handleEndEvent = (e) => {
    setDateEnd(e);
    setFormValues({ ...formValues, end: e });
  };

  const [formValues, setFormValues] = useState(initEvent);

  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
      setDateStart(activeEvent.start);
      setDateEnd(activeEvent.end);
    } else {
      setFormValues(initEvent);
      setDateStart(now.toDate());
      setDateEnd(nowPlus1.toDate());
    }
  }, [activeEvent]);

  const handleInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const closeModal = () => {
    setFormValues(initEvent);
    setDateStart(now.toDate());
    setDateEnd(nowPlus1.toDate());
    dispatch(eventClearActive());
    dispatch(uiCloseModal());
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Sawl.fire(
        'Error',
        'La fecha y hora fin debe ser mayor a la fecha y hora inicio',
        'error',
      );
    }
    if (title.trim().length < 2) {
      setTitleValid(false);
    } else {
      if (activeEvent) {
        dispatch(eventUpdated({ ...formValues }));
      } else {
        dispatch(
          eventAddNew({
            ...formValues,
            id: new Date().getTime(),
            user: { _id: 'uid', name: 'username' },
          }),
        );
      }
      setTitleValid(true);
      closeModal();
    }
  };

  return (
    <Modal
      isOpen={modalOpen}
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
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder='Título del evento'
            name='title'
            value={title}
            onChange={(e) => {
              handleInputChange(e);
              if (e.target.value.length > 2) {
                setTitleValid(true);
              }
            }}
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
