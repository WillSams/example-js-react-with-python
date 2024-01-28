import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { mountWithRouter } from '../../reactTestHelpers';
import StaticComponent from '../../../src/components/static';

configure({ adapter: new Adapter() });

describe('StaticComponent component', () => {
  const components = [
    'Privacy',
    'Terms',
  ];

  components.forEach((component) => {
    it(`should render ${component} component`, () => {
      const initialEntries = [`/${component.toLowerCase()}`];
      const wrapper = mountWithRouter(
        <Routes>
          <Route exact path="/:componentType" element={<StaticComponent />} />
        </Routes>,
        initialEntries
      );

      const title = wrapper.find('h1').text();
      expect(title).toEqual(component);
    });
  });
});
