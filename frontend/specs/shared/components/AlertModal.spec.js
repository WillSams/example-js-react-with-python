import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button

import { AlertModal } from '../../../src/shared/components';

configure({ adapter: new Adapter() });

describe('AlertModal Component', () => {
  it('should render correctly with success type', () => {
    const onCloseMock = jest.fn();
    const wrapper = shallow(
      <AlertModal type="success" message="Success message" onClose={onCloseMock} />
    );

    expect(wrapper.find(Modal.Title).text()).toEqual('Success');
    expect(wrapper.find(Modal.Body).text()).toEqual('Success message');

    const closeButton = wrapper.find(Button);
    closeButton.simulate('click');
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should render correctly with danger type', () => {
    const onCloseMock = jest.fn();
    const wrapper = shallow(
      <AlertModal type="danger" message="Error message" onClose={onCloseMock} />
    );

    expect(wrapper.find(Modal.Title).text()).toEqual('Error');
    expect(wrapper.find(Modal.Body).text()).toEqual('Error message');

    const closeButton = wrapper.find(Button);
    closeButton.simulate('click');
    expect(onCloseMock).toHaveBeenCalled();
  });
});
