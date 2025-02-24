import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../assets/styles/experienceforms.css'; // Ensure the path is correct
import { FaPlus } from 'react-icons/fa';

const ExperienceForms = () => {
  // Initialize state for multiple sets of form fields
  const [experienceData, setExperienceData] = useState([{
    jobTitle: '',
    companyName: '',
    yearsOfExperience: '',
    skills: ''
  }]);

  // Handle change in input fields
  const handleInputChange = (index, field, event) => {
    const newExperienceData = [...experienceData];
    newExperienceData[index][field] = event.target.value;
    setExperienceData(newExperienceData);
  };

  // Add new form data object to the experienceData array
  const addForm = () => {
    setExperienceData([...experienceData, {
      jobTitle: '',
      companyName: '',
      yearsOfExperience: '',
      skills: ''
    }]);
  };

  return (
    <Container fluid className='exPageContainer'>
      {experienceData.map((expData, index) => (
        <Row key={index} className="justify-content-center">
          <Col xs={12} md={6} className='exContainer my-4 p-2'>
            <Form className='exForms mx-4'>
              <div className='d-flex align-items-center justify-content-between my-3'>
                <h2 className='exFormHeading'>Experience {index + 1}</h2>
                {index === experienceData.length - 1 && (
                  <span className="plusIcon" onClick={addForm}>
                    <FaPlus />
                  </span>
                )}
              </div>
              {[
                { label: 'JOB TITLE', field: 'jobTitle' },
                { label: 'COMPANY NAME', field: 'companyName' },
                { label: 'YEARS OF EXPERIENCE', field: 'yearsOfExperience' },
              ].map((item) => (
                <Form.Group key={item.field} as={Row} controlId={`form${item.field}${index}`} className='mb-3'>
                  <Form.Label column sm="4" className='exlabel'>{item.label}</Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text" // assuming all fields are text inputs
                      placeholder={item.label}
                      value={expData[item.field]}
                      onChange={(event) => handleInputChange(index, item.field, event)}
                    />
                  </Col>
                </Form.Group>
              ))}
              <Form.Group as={Row} controlId={`formSkills${index}`}>
                <Form.Label column sm="4" className='exlabel'>SKILLS</Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="SKILLS"
                    value={expData.skills}
                    onChange={(event) => handleInputChange(index, 'skills', event)}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ExperienceForms;