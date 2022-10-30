import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../src/store/ui/uiSlice';

describe('pruebas en uiSlice', () => {
  test('debe de regresar el estado por defecto', () => {
    const state = uiSlice.getInitialState();
    expect(state).toEqual({
      isDateModalOpen: false,
    });
  });

  test('debe de cambiar el isDateModalOpen entre false y true', () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());

    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());

    expect(state.isDateModalOpen).toBeFalsy();
  });
});
