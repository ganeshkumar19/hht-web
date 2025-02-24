import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../assets/styles/educationforms.css';
import { FaPlus } from 'react-icons/fa';

const EducationForms = () => {
  // Initialize state for multiple sets of form fields
  const [formsData, setFormsData] = useState([{
    instituteName: '',
    specialisation: '',
    cgpaOrPercentage: ''
  }]);

  // Handle change in input fields
  const handleInputChange = (index, field, event) => {
    const newFormsData = [...formsData];
    newFormsData[index][field] = event.target.value;
    setFormsData(newFormsData);
  };

  // Add new form data object to the formsData array
  const addForm = () => {
    setFormsData([...formsData, {
      instituteName: '',
      specialisation: '',
      cgpaOrPercentage: ''
    }]);
  };

  return (
    <Container fluid className='edPageContainer'>
      {formsData.map((formData, index) => (
        <Row key={index} className="justify-content-center">
          <Col xs={12} md={6} className='edContainer my-4 p-2'>
            <Form className='edForms mx-4'>
              <div className='d-flex align-items-center justify-content-between my-3'>
                <h2 className='edFormHeading'>Education {index + 1}</h2>
                {index === formsData.length - 1 && (
                  <span className="plusIcon" onClick={addForm}>
                  <FaPlus />
                  </span>
  
                )}
              </div>
              {[
                { label: 'INSTITUTE NAME', field: 'instituteName' },
                { label: 'SPECIALISATION', field: 'specialisation' },
                { label: 'CGPA OR %', field: 'cgpaOrPercentage' }
              ].map((item) => (
                <Form.Group key={item.field} as={Row} controlId={`form${item.field}${index}`} className='mb-3'>
                  <Form.Label column sm="4" className='edlabel'>{item.label}</Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text" // assuming all fields are text inputs
                      placeholder={item.label}
                      value={formData[item.field]}
                      onChange={(event) => handleInputChange(index, item.field, event)}
                    />
                  </Col>
                </Form.Group>
              ))}
            </Form>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default EducationForms;
