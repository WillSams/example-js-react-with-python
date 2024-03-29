import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function AlertModal({ type, message, onClose }) {
  const variant = type === 'danger' ? 'danger' : 'info';

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{type === 'danger' ? 'Error' : 'Success'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={variant} onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AlertModal;
