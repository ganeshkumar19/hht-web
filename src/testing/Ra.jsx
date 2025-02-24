import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AP from '../assets/images/ar.jpg'
import './ticketstyles.css';

const Ra = () => {
  return (
    <Container className='gbConatiainer'>
        <Row>
            <Col xs={12} >
             <div className='rb'>

             </div>
            </Col>
            <div className='gbImageContainer'>
                <img src={AP}/>
            </div>
        </Row>
    </Container>
  )
}

export default Ra