import { combineReducers } from 'redux';

import { homeReducer } from './home/reducers';
import { newReducer, showReducer, editReducer } from './reservations/reducers';

const siteReducer = combineReducers({
  home: homeReducer,
  newReservations: newReducer,
  showReservations: showReducer,
  editReservations: editReducer,
});

export default siteReducer;
