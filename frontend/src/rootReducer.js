import { combineReducers } from 'redux';

import siteReducers from '@/components/reducer';
import sharedReducer from '@/shared/sharedReducer';

const rootReducer = (routerReducer) =>
  combineReducers({
    router: routerReducer,
    site: siteReducers,
    shared: sharedReducer,
  });
export default rootReducer;
