import React from 'react';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

import { mountWithRouter } from '../../reactTestHelpers';
import { InvalidRoute } from '../../../src/shared/components';

describe('InvalidRoute component', () => {
  it('should render without error', () => {
    const wrapper = mountWithRouter(<InvalidRoute />);
    const title = wrapper.find('h1').text();

    expect(title).toEqual('Component not found');
  });
});


