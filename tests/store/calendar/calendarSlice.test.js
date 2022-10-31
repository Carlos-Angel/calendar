import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from '../../../src/store/calendar/calendarSlice';
import {
  calendarWithActiveEventState,
  events,
  initialState,
} from '../../fixtures/calendarState.fixture';

describe('pruebas en calendarSlice', () => {
  test('debe de retornar el estado inicial', () => {
    expect(calendarSlice.getInitialState()).toEqual(initialState);
  });

  test('onSetActiveEvent debe de activar el evento', () => {
    const state = calendarSlice.reducer(calendarWithActiveEventState, onSetActiveEvent(events[0]));

    expect(state.activeEvent).toEqual(events[0]);
  });

  test('onAddNewEvent debe de agregar un evento', () => {
    const newEvent = {
      id: '3',
      start: new Date('2022-10-21 13:00:00'),
      end: new Date('2022-10-21 15:00:00'),
      title: 'Cumpleaños de Fernando!!',
      notes: 'Alguna nota!!',
    };

    const state = calendarSlice.reducer(calendarWithActiveEventState, onAddNewEvent(newEvent));

    expect(state.events).toEqual([...events, newEvent]);
  });

  test('onUpdateEvent debe de actualizar un evento', () => {
    const updatedEvent = {
      id: '1',
      start: new Date('2022-10-21 13:00:00'),
      end: new Date('2022-10-21 15:00:00'),
      title: 'Cumpleaños de Fernando!! actualizado',
      notes: 'Alguna nota!! actualizado',
    };

    const state = calendarSlice.reducer(calendarWithActiveEventState, onUpdateEvent(updatedEvent));

    expect(state.events).toContain(updatedEvent);
  });

  test('onDeleteEvent debe de borrar un evento', () => {
    const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());

    expect(state.activeEvent).toBe(null);
  });

  test('onLoadEvents debe de establecer los eventos', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));

    expect(state.events).toEqual(events);
  });

  test('onLogoutCalendar debe de limpiar el estado', () => {
    const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());

    expect(state).toEqual(initialState);
  });
});
