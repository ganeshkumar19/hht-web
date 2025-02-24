import React from 'react';
import { Row, Col } from 'react-bootstrap';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
};

const OrderInfoCard = ({ order }) => {
    return (
      <Row className="orderInformationContainer">
        <Row className="m-0 p-0 d-flex flex-column flex-md-row align-items-center justify-content-center odRow my-2">
          <Col
            xs={12}
            md={6}
            className="d-flex align-items-center justify-content-between text-center flex-md-column align-items-md-start text-md-start py-2 m-0 p-0"
          >
            <p className="m-0 p-0 orderInfoText">
              <span className="spanInfoText">Date: </span>
              {formatDate(order.CreatedAt)}
            </p>
            <p className="m-0 p-0 orderInfoText">
              <span className="spanInfoText">Order Id: </span>
              {order.ID}
            </p>
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex align-items-center justify-content-between text-center flex-md-column align-items-md-end text-md-end py-2 m-0 p-0"
          >
            <p className="m-0 p-0 orderInfoText">
              <span className="spanInfoText">Status: </span>
              {order.status}
            </p>
            <p className="m-0 p-0 orderInfoText">
              <span className="spanInfoText">Total: </span>
              ₹{order.total_amount}
            </p>
          </Col>
        </Row>
  
        {/* Map over the items in each order */}
        {order.Items.map((item) => (
          <Row
            className="m-0 p-0 mb-3"
            key={item.ID}
            style={{ borderBottom: '2px solid #000', padding: '2px 0' }}
          >
            <Col xs={10} className="m-0 p-0">
              <h6 className="pcName">{item.product.name}</h6>
              <p className="pcSizeQty">
                Size: {item.product_variant.variant_size} | Qty: {item.quantity}
              </p>
            </Col>
            <Col xs={2} className="text-end m-0 p-0">
              <h6 className="pcPrice">₹{item.price}</h6>
            </Col>
          </Row>
        ))}
  
        <Row className="m-0 p-0 mb-3">
          <Col xs={10} className="m-0 p-0">
            <h6 className="pcName">Shipping Charges</h6>
          </Col>
          <Col xs={2} className="text-end m-0 p-0">
            <h6 className="pcPrice">₹199</h6>
          </Col>
        </Row>
      </Row>
    );
  };
  
  export default OrderInfoCard;
  