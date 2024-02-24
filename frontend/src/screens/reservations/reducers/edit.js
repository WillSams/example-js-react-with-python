import { actionCreators, createComponentReducer } from '@/shared/base';

const initialState = {
  loading: true,
};

const actionHandlers = {};

const reducer = createComponentReducer(
  actionCreators.EDIT_RESERVATION_COMPONENT,
  initialState,
  actionHandlers,
);

export { reducer };
