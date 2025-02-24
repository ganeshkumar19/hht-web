import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/emailstyles.css'
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer';

const EmailBox = () => {

  const MotionCol = motion(Col)

  const textVariants = {
    hidden: {
      opacity: 0,
       x: -100
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3,
        duration: 1,
      }
    }
  }

  const buttonVariants ={
    hidden: {
      opacity: 0,
       x: 40
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.0,
        duration: 0.5,
      }
    }
  }
  return (
    <Container fluid className='emailContainer m-0 p-0 py-5 d-flex justify-content-center align-items-center text-center'>
        <Row style={{width: '100%'}}>
        <InView threshold={0.5} triggerOnce={true}>
         {({ ref, inView }) => (
            <MotionCol variants={textVariants} 
            ref={ref}  
            initial='hidden' 
            animate={inView ? 'visible' : 'hidden'} 
            xs={12} className='mb-3'>
              <p className='emailHeadingText'>JOIN US ON OUR MAILING <br/> LIST TO RECEIVE EXCLUSIVE NEWSLETTER</p>
            </MotionCol>
         )}
       </InView>
       <InView threshold={0.5} triggerOnce={true}>
         {({ ref, inView }) => (
            <MotionCol variants={buttonVariants}  
            ref={ref}  
            initial='hidden' 
            animate={inView ? 'visible' : 'hidden'} 
             xs={12}>
             <div className='d-flex align-items-center justify-content-center'>
             <button className="emailButton">
                  ENTER YOUR MAIL ID <FontAwesomeIcon icon={faArrowRight} style={{color: '#56A5BB'}}/>
                </button>
            </div>
            </MotionCol>
         )}
       </InView>
        </Row>
    </Container>
  )
}

export default EmailBox