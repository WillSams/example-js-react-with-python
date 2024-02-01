import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { mountWithRouter } from '../../reactTestHelpers';
import StaticComponent from '../../../src/components/static';

configure({ adapter: new Adapter() });

describe('StaticComponent component', () => {
  it(`should render Terms component`, () => {
    const initialEntries = ['/terms'];
    const wrapper = mountWithRouter(
      <Routes>
        <Route exact path='/terms' element={<StaticComponent componentType={'terms'} />} />
      </Routes>,
      initialEntries,
    );

    const divs = wrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it(`should render Privacy component`, () => {
    const initialEntries = ['/privacy'];
    const wrapper = mountWithRouter(
      <Routes>
        <Route exact path='/privacy' element={<StaticComponent componentType={'privacy'} />} />
      </Routes>,
      initialEntries,
    );

    const divs = wrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
});


