import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { mountWithRouter } from '../../reactTestHelpers';
import HomeComponent from '../../../src/components/home';

Enzyme.configure({ adapter: new Adapter() });

describe('HomeComponent component', () => {

  it(`should render reservation component`, () => {
    const initialEntries = [`/`];
    const wrapper = mountWithRouter(
      <Routes>
        <Route
          exact
          path={'/'}
          element={<HomeComponent />}
        />
      </Routes>,
      initialEntries
    );

    expect(wrapper.find('div[data-name="home-component"]').length).toEqual(1);
  });
});
