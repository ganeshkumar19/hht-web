import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { FaStar } from 'react-icons/fa';

const JoinFanFamModal = ({ showModal, toggleModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'fanFam'), {
        name,
        email,
        rating: rating || 0, // Default to 0 if rating is not provided
        feedback: feedback || '0', // Default to '0' if feedback is not provided
        location: location || '0', // Default to '0' if location is not provided
        timestamp: new Date(),
      });
      setSuccess('Thank you for signing up with HHT FanFam!');
      setError('');
      // Reset form fields
      setName('');
      setEmail('');
      setRating(0);
      setFeedback('');
    } catch (e) {
      console.error('Error adding document: ', e);
      setError('Error adding document. Please try again.');
      setSuccess('');
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = `${position.coords.latitude},${position.coords.longitude}`;
          setLocation(loc);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLocation('0'); // Default to '0' if location is not available
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLocation('0'); // Default to '0' if geolocation is not supported
    }
  };

  // Fetch location when the modal is opened
  useEffect(() => {
    if (showModal) {
      fetchLocation();
    }
  }, [showModal]);

  const handleHomeRedirect = () => {
    toggleModal(); // Close the modal
    navigate('/'); // Redirect to home page
  };

  const handleRatingChange = (ratingValue) => {
    setRating(ratingValue);
  };

  return (
    <Modal show={showModal} onHide={toggleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Join FanFam</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success && (
          <Alert variant="success">
            {success}
            <div className="d-flex justify-content-center mt-4">
              <Button variant="primary" onClick={handleHomeRedirect}>
                Go to Home Page
              </Button>
            </div>
          </Alert>
        )}
        {!success && (
          <>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>
                  Name: <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="email" className="mt-3">
                <Form.Label>
                  Email: <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="rating" className="mt-3">
                <Form.Label>Rate Us:</Form.Label>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={24}
                      color={star <= rating ? "#ffc107" : "#e4e5e9"}
                      onClick={() => handleRatingChange(star)}
                      style={{ cursor: "pointer", marginRight: "5px" }}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group controlId="feedback" className="mt-3">
                <Form.Label>Feedback:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter your feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="mt-4">
                Submit
              </Button>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default JoinFanFamModal;