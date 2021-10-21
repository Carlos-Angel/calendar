import { uiCloseModal, uiOpenModal } from '../../actions/ui';
import { uiReducer } from '../../reducers/uiReducers';

const initialState = {
  modalOpen: false,
};

describe('pruebas en uiRedicers', () => {
  test('debe de retornar el estado por defecto', () => {
    const state = uiReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('debe de abrir el modal', () => {
    const modalOpen = uiOpenModal();
    const state = uiReducer(initialState, modalOpen);
    expect(state).toEqual({ modalOpen: true });
  });

  test('debe de cerrar el modal', () => {
    const closeModal = uiCloseModal();
    const state = uiReducer(initialState, closeModal);
    expect(state).toEqual({ modalOpen: false });
  });
});
