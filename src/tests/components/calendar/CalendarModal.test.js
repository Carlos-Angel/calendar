import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import {
  eventStartUpdated,
  eventClearActive,
  startEventAddNew,
} from '../../../actions/events';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('../../../actions/events', () => ({
  eventStartUpdated: jest.fn(),
  eventClearActive: jest.fn(),
  startEventAddNew: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).second(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initialState = {
  calendar: {
    events: [],
    activeEvent: {
      title: 'event title',
      notes: 'event notes',
      start: now.toDate(),
      end: nowPlus1.toDate(),
    },
  },
  auth: {
    uid: '123',
    name: 'test',
  },
  ui: {
    modalOpen: true,
  },
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>,
);

describe('Pruebas en <CalendarModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe de mostrarse correctamente', () => {
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });

  test('debe de llamar la acción de cerrar y abrir el Modal', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(eventStartUpdated).toHaveBeenCalledWith(
      initialState.calendar.activeEvent,
    );
    expect(eventClearActive).toHaveBeenCalled();
  });

  test('debe de mostrar error si falta el titulo', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(
      true,
    );
  });

  test('debe de crear un nuevo evento', () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: '123',
        name: 'Fernando',
      },
      ui: {
        modalOpen: true,
      },
    };

    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>,
    );

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola pruebas',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(startEventAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: 'Hola pruebas',
      notes: '',
    });

    expect(eventClearActive).toHaveBeenCalled();
  });

  test('debe de validar las fechas', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola pruebas',
      },
    });

    const hoy = new Date();

    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'La fecha y hora fin debe ser mayor a la fecha y hora inicio',
      'error',
    );
  });
});
