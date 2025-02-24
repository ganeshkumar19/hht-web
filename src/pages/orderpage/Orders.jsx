import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'; // Assuming you're using Bootstrap
import { useOrders } from '../../contexts/OrderContext';
import HeaderCard from '../../components/HeaderCard';

const Orders = () => {
  const { ordersList } = useOrders(); // Access ordersList from OrderContext

  return (
    <Container fluid className='hhthubContainer'>
      <HeaderCard backgroundColor={"#F5BE49"} color={"#57A5BB"} name={"Orders"}/>
      <h2 className="my-4">Your Orders</h2>
      {ordersList.map(order => (
        <Card key={order.id} className="mb-3 mx-5">
          <Card.Body>
            <Row>
              <Col xs={12} md={8}>
                <h5>Order #{order.orderNumber}</h5>
                <p>Date: {order.date}</p>
                <p>Status: {order.status}</p>
                <p>Total: ₹{order.total}</p>
              </Col>
              <Col xs={12} md={4}>
                <h6>Items:</h6>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item.name} (x{item.quantity}) - ₹{item.price}</li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Orders;