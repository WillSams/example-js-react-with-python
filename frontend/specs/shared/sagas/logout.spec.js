import { expectSaga } from 'redux-saga-test-plan';
import { takeLatest } from 'redux-saga/effects';

import { default as sharedSagas } from '../../../src/shared/sagas';
import { logout } from '../../../src/shared/sagas/logout';
import { actionTypes, } from '../../../src/shared/base';

describe('logout Saga', () => {

  it('should be invoked by latest LOGOUT dispatch', () => {
    return expectSaga(sharedSagas)
      .provide([
        [takeLatest(actionTypes.LOGOUT, logout),],
      ])
      .silentRun();
  });
});




