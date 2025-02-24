import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import '../assets/styles/paymentrejectstyles.css';

const PaymentRejectionModal = ({ show, onHide, onTryAgain }) => {
  return (
    <Modal show={show} onHide={onHide} centered className='paymentrejectModal'>
      <Modal.Body className='paymentrejectbody'>
        <h4 className="text-center ptrText pb-4">Payment Unsuccessful</h4>
        <Row>
          <Col xs={12} className='d-flex justify-content-center align-items-center'>
            <p className='paymentRejectedText text-center'>Oops! Your payment didn't go through.
            Please attempt again.</p>
          </Col>
        </Row>
        <div className="my-3 d-flex justify-content-between align-items-center">
          <button className='paymentRejectedButton trButton' onClick={onHide}>
            Cancel
          </button>
          <button className='paymentRejectedButton' onClick={onTryAgain}>
            Try Again
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentRejectionModal;