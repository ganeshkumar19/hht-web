import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../assets/styles/HhtMoviesQr.css';
import JoinFanFamModal from '../modals/JoinFanFamModal'; // Adjust the path as necessary

const HhtMoviesQr = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: -85,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        duration: 0.8,
      },
    },
  };

  return (
    <Container fluid className="thankYouContainer">
      <div className="nameContainer">
        <h3 className="mt-2">Thank You for always being with us</h3>
      </div>
      <Container className="innerThankYouContainer">
        <Row className="justify-content-center text-center mt-5">
          <Col md={8}>
            
            <motion.h2 initial="hidden" animate="visible" variants={containerVariants}>
            உங்கள் அன்பால் மட்டுமே உருவான HipHopTamizha
            </motion.h2>
            <Button id="showFormButton" className="mt-4" onClick={toggleModal}>
              Join HHT FanFam
            </Button>
          </Col>
        </Row>
      </Container>
      <JoinFanFamModal showModal={showModal} toggleModal={toggleModal} />
    </Container>
  );
};

export default HhtMoviesQr;