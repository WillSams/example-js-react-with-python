import { expectSaga } from 'redux-saga-test-plan';
import { takeLatest } from 'redux-saga/effects';

import { default as sharedSagas } from '../../../src/shared/sagas';
import { loadComponent } from '../../../src/shared/sagas/loadComponent';

describe('loadComponent Saga', () => {
  const componentName = 'TestComponent';
  const actionType = `LOAD_${componentName}`;
  const action = { type: actionType, };

  it(`should dispatch the LOAD_${componentName} action`, () => {
    return expectSaga(loadComponent, { componentName })
      .put(action).run();
  });

  it(`should be invoked by latest LOAD_${componentName} dispatch`, () => {
    return expectSaga(sharedSagas)
      .provide([
        [takeLatest(action, loadComponent), { componentName }],
      ])
      .silentRun();
  });
});


