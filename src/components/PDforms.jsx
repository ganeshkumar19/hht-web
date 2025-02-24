import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import '../assets/styles/pdforms.css';

const PDforms = ({ employmentType, formData, handleChange , errors}) => {



  const fields = [
    { label: 'DOB', name: 'DOB', type: 'date' },
    { label: 'Contact Number', name: 'contactNumber', type: 'text' },
    { label: 'Email', name: 'email', type: 'text' },
    { label: 'Address', name: 'address', type: 'text' }
  ];

  return (
    <Container fluid className='pdPageContainer'>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className='pdContainer my-4 p-2'>
          <Form className='pdForms mx-4 p-2'>
          <h2 className='pdFormHeading'>{employmentType}</h2>
            {/* Special handling for Name with two input boxes */}
            <Form.Group as={Row} controlId="formName" className='mb-3'>
              <Form.Label column sm="4" className='pdlabel'>Name</Form.Label>
              <Col sm="8">
                <Row>
                  <Col sm="6" className='nameInput'>
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                      name="firstName"
                    />
                  </Col>
                  <Col sm="6">
                    <Form.Control
                      type="text"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      name="lastName"
                    />
                  </Col>
                </Row>
              </Col>
            </Form.Group>

            {/* Other fields */}
            {fields.map((field, index) => (
            <Form.Group key={index} as={Row} controlId={`form${field.name}`} className='mb-3'>
              <Form.Label column sm="4" className='pdlabel'>{field.label}</Form.Label>
              <Col sm="8">
                <Form.Control
                  type={field.type}
                  placeholder={field.label}
                  value={formData[field.name]}
                  onChange={handleChange}
                  name={field.name}
                  isInvalid={!!errors[field.name]}
                />
                 <Form.Control.Feedback type="invalid" className='feedbackInputText'>
                    {errors[field.name]}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          ))}


            {/* Address field with textarea */}
            <Form.Group as={Row} controlId="formAddress">
              <Form.Label column sm="4" className='pdlabel'>Describe Your Awesome in a Few Words!</Form.Label>
              <Col sm="8">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Desc"
                  value={formData.Desc}
                  onChange={handleChange}
                  name="Desc"
                />
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PDforms;
