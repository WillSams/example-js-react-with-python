import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { DefaultTab } from '../../../src/components/home/tabs/DefaultTab';

configure({ adapter: new Adapter() });

describe('Home/DefaultTab component', () => {
  it('should render Reservations tab even if reservations prop is empty', () => {
    const wrapper = shallow(<DefaultTab reservations={[]} />);

    expect(wrapper.find('div[data-name="reservations-tab"]').length).toEqual(1);
    expect(wrapper.find('table').length).toEqual(0);
  });

  it('should render Reservations tab with table of reservations', () => {
    const props = {
      reservations: [{ id: '1', Name: 'Test Reservation 1' }, { id: '2', Name: 'Test Reservation 2' }],
    };

    const wrapper = shallow(<DefaultTab {...props} />);

    expect(wrapper.find('div[data-name="reservations-tab"]').length).toEqual(1);
    expect(wrapper.find('table').length).toEqual(1);
  });
});
