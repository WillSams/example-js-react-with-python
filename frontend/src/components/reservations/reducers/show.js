import { actionTypes, createComponentReducer } from '@/shared/base';

const initialState = {
  loading: true,
};

const actionHandlers = {};

const reducer = createComponentReducer(
  actionTypes.SHOW_RESERVATION_COMPONENT,
  initialState,
  actionHandlers,
);

export { reducer };
