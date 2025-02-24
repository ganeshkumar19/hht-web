import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/redirectstyles.css'
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer';
import {Link} from 'react-router-dom'
import ROFT from '../assets/images/roft.png'

const RedirectBanner = () => {
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
                type: 'spring',
                stiffness: 110,
                damping: 4,
                delay: 0.3,
                duration: 1,
            }
        }
    };

  return (
    <Container fluid className='redirectContainer m-0 p-0 py-5 d-flex justify-content-center align-items-center text-center'>
    <Row style={{width: '100%'}}>
    <InView threshold={0.5} triggerOnce={true}>
     {({ ref, inView }) => (
        <MotionCol variants={textVariants} 
        ref={ref}  
        initial='hidden' 
        animate={inView ? 'visible' : 'hidden'} 
        xs={12} className='mb-3'>
            <Link to= '/events'>
           <Image fluid src={ROFT} alt="RETURN OF THE DRAGON" className='roftImage' />
           </Link>
        </MotionCol>
     )}
   </InView>
    </Row>
</Container>
  )
}

export default React.memo(RedirectBanner)