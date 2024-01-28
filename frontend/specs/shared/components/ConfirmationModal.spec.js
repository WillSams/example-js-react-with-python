import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Modal, Button } from 'react-bootstrap';

import ConfirmationModal from '../../../src/shared/components/ConfirmationModal';

configure({ adapter: new Adapter() });

describe('ConfirmationModal Component', () => {
  it('should render correctly with default props', () => {
    const handleConfirmMock = jest.fn();
    const handleRejectMock = jest.fn();

    const wrapper = shallow(
      <ConfirmationModal
        isOpen={true}
        title="Confirmation Modal"
        message="Are you sure?"
        handleConfirm={handleConfirmMock}
        handleReject={handleRejectMock}
      />
    );

    expect(wrapper.find(Modal.Title).text()).toEqual('Confirmation Modal');
    expect(wrapper.find(Modal.Body).text()).toEqual('Are you sure?');

    const confirmButton = wrapper.find(Button).at(0);
    expect(confirmButton.text()).toEqual('Confirm');
    confirmButton.simulate('click');
    expect(handleConfirmMock).toHaveBeenCalled();

    const cancelButton = wrapper.find(Button).at(1);
    expect(cancelButton.text()).toEqual('Cancel');
    cancelButton.simulate('click');
    expect(handleRejectMock).toHaveBeenCalled();
  });

  it('should render correctly with custom props', () => {
    const handleConfirmMock = jest.fn();
    const handleRejectMock = jest.fn();

    const wrapper = shallow(
      <ConfirmationModal
        isOpen={true}
        title="Custom Modal"
        message="Custom message"
        confirmationText="Accept"
        cancellationText="Decline"
        confirmButtonStyle="success"
        handleConfirm={handleConfirmMock}
        handleReject={handleRejectMock}
      />
    );

    expect(wrapper.find(Modal.Title).text()).toEqual('Custom Modal');
    expect(wrapper.find(Modal.Body).text()).toEqual('Custom message');

    const confirmButton = wrapper.find(Button).at(0);
    expect(confirmButton.text()).toEqual('Accept');
    expect(confirmButton.prop('variant')).toEqual('success');
    confirmButton.simulate('click');
    expect(handleConfirmMock).toHaveBeenCalled();

    const cancelButton = wrapper.find(Button).at(1);
    expect(cancelButton.text()).toEqual('Decline');
    cancelButton.simulate('click');
    expect(handleRejectMock).toHaveBeenCalled();
  });
});

