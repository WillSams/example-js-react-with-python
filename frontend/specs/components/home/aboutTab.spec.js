import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { AboutTab } from '../../../src/components/home/tabs/AboutTab';

configure({ adapter: new Adapter() });

describe('Home/AboutTab component', () => {
  it('should render Default tab even if arena name prop is empty', () => {
    const wrapper = shallow(<AboutTab />);

    expect(wrapper.find('h3').text()).toEqual('ABOUT');
  });

  it('should render about tab', () => {
    const wrapper = shallow(<AboutTab />);

    const tab = wrapper.find('div[data-name="about-tab"]');
  });
});
