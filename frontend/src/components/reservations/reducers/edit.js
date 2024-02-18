import { actionTypes, createComponentReducer } from '@/shared/base';

const initialState = {
  loading: true,
};

const actionHandlers = {};

const reducer = createComponentReducer(
  actionTypes.EDIT_RESERVATION_COMPONENT,
  initialState,
  actionHandlers,
);

export { reducer };
