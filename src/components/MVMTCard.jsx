import React from 'react'
import { Container, Image, Row, Col } from 'react-bootstrap';
import '../assets/styles/mvmtcardstyles.css'
import { FaArrowRight } from "react-icons/fa";
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import BAR from '../../src/assets/images/Bar1.png'

const MVMTCard = ({mvmtDetails}) => {

  const MotionCol = motion(Col)

  const cardVariants = {
    hidden: {
      opacity: 0,
      x:-100,
    },
    visible:{
      opacity: 1,
      x:0,
      transition: {
        duration: 0.6,
      }
    }



  }
  const redirectVariants = {
    hover: {
      scale: [1, 1.04, 1],  // Scale from normal, to larger, and back to normal
      transition: {
        duration: 0.8,  // Duration of one cycle of the animation
        repeat: Infinity,  // Repeat the animation indefinitely
        repeatType: "loop",  // Ensure the animation loops
        ease: "easeInOut"  // Use an ease-in-out for smoother animation
      }
    }
  };
  return (
    <Container fluid>
    <Row>
        {mvmtDetails.map((mvmt) => (
            <InView threshold={0.2} triggerOnce={true} key={mvmt.id}>
            {({ ref, inView }) => (
            <MotionCol 
            key={mvmt.id}
            ref={ref} 
            variants={cardVariants} 
            initial='hidden' 
            animate={inView ? 'visible' : 'hidden'} xs={12} sm={6} md={4} className="my-3">
             <LazyLoadImage
              alt='mvmt image'
              src={mvmt.image} 
              placeholderSrc={BAR}// use normal src attribute to set the source
              effect="blur" // Optional: choose the effect you want
              className='mvmtCardImage'
            />
            <motion.a  variants={redirectVariants} whileHover="hover" href={mvmt.link} target="_blank" rel="noopener noreferrer" className='mvmtButton my-2' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <p className='m-0 p-0'>{`Watch ${mvmt.title} ${mvmt?.episode|| ''}`}</p>
            <span>
            <FaArrowRight />
            </span>
            </motion.a>
            </MotionCol>
              )}
        </InView>
        ))}
        </Row>
    </Container>
  )
}

export default MVMTCard