import { combineReducers } from 'redux';

import siteReducers from '@/screens/reducer';
import sharedReducer from '@/shared/sharedReducer';

const rootReducer = (routerReducer) =>
  combineReducers({
    router: routerReducer,
    site: siteReducers,
    shared: sharedReducer,
  });
export default rootReducer;
