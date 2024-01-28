import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';

export const mockStore = configureMockStore();

export const mountWithRouter = (node, initialEntries = ['/'], initialState = {}) =>
  mount(
    <Provider store={mockStore(initialState)}>
      <MemoryRouter initialEntries={initialEntries}>{node}</MemoryRouter>
    </Provider>
  );

