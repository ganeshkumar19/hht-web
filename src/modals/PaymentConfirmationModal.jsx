import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import '../assets/styles/paymentconfirmationstyles.css'

const PaymentConfirmationModal = ({ show, onHide, paymentDetails }) => {
  const { userName, userEmail, cartItems, grandTotal, referenceNumber } = paymentDetails;
  const navigate = useNavigate();

  const formattedGrandTotal = (grandTotal / 100).toFixed(2); 

  const handleReturnHome = () => {
    onHide();
    navigate('/'); // Navigate to home after closing modal
  };

  return (
    <Modal show={show} onHide={onHide} centered className='paymentConfirmModal'>
      <Modal.Body className='paymentconfirmbody'>
        <h4 className="text-center ptcText pb-4">Your order has been confirmed!</h4>
        <Row className="mb-4" style={{ borderBottom: '2px solid #000', padding: '2px 0' }}>
          <Col xs={12}>
            <p className="paymentUserInfo">
              <strong className='paymentUserDetails me-2'>Name:</strong> {userName || "Guest"}
            </p>
            <p className="paymentUserInfo">
              <strong className='paymentUserDetails me-2'>Reference number:</strong> {referenceNumber}
            </p>
            <p className="paymentUserInfo">
              <strong className='paymentUserDetails me-2'>Email:</strong> {userEmail || "Not provided"}
            </p>
          </Col>
        </Row>

        {cartItems.map((item, index) => (
          <div key={index} className='mb-3' style={{ borderBottom: '2px solid #000', padding: '2px 0' }}>
            <Row>
              <Col xs={8}>
                <h6 className='pcName'>{item?.product?.name}</h6>
                <p className='pcSizeQty'>Size: {item?.product_variant?.variant_size} &nbsp; | &nbsp; Qty: {item?.quantity}</p>
              </Col>
              <Col xs={4} className="text-end">
                <h6 className='pcPrice'>{item?.price}</h6>
              </Col>
            </Row>
          </div>
        ))}
        
        {/* Total Amount */}
        <Row className="my-3">
          <Col xs={8}>
            <h5 className='paymentamountTotal'>Amount Paid</h5>
          </Col>
          <Col xs={4} className="text-end">
            <h5 className='paymentamountTotal'>₹{formattedGrandTotal}</h5>
          </Col>
        </Row>

        {/* Return Home Button */}
        <div className="my-3 d-flex justify-content-center align-items-center">
        <button className='paymentConfirmButton' onClick={handleReturnHome}>
        Return Home
        </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentConfirmationModal;

