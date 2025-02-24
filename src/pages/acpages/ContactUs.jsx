import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import HeaderCard from '../../components/HeaderCard'
import '../../assets/styles/contactusstyles.css'

const ContactUs = () => {
  return (
    <Container fluid className='contactContainer'>
    <HeaderCard backgroundColor={"#3EA66B"} color={"#F4E003"} name="Contact Us" />
    <Row className='p-3'>
        <Col xs={12} className='my-2'>
        <h3 className='termTitleText'>Get in Touch with Us</h3>
        <p className='ps-4 termDescText'>We’re here to connect with you! For any questions, feedback, or inquiries, feel free to reach out to us at <span className='spanText'>social@hiphoptamizha.com</span> Whether you're a fan, collaborator, or just want to learn more about Hiphop Tamizha, we’d love to hear from you.</p>
        <p className='ps-4 termDescText'>
        <span className='spanText me-2'>Address:</span> Chennai, TN, 600085
          </p>
        </Col>
        </Row>         
 </Container>
  )
}

export default ContactUs