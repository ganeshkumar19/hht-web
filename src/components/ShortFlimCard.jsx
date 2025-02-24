import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import '../assets/styles/shortflimcardstyles.css'
import { FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { InView } from 'react-intersection-observer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';


const ShortFlimCard = ({ flims }) => {
  const navigate = useNavigate();


  const MotionCol = motion(Col)

  const FlimVariants = {
    hidden: { opacity: 0, scale: 0.80, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const handleFlimClick = (flimId) => {
    navigate(`/mvmt/shortflims/${flimId}`); // Navigate to product details route
  };


  const redirectVariants = {
    hover: {
      scale: [1, 1.04, 1],  // Scale from normal, to larger, and back to normal
      transition: {
        duration: 0.7,  // Duration of one cycle of the animation
        repeat: Infinity,  // Repeat the animation indefinitely
        repeatType: "loop",  // Ensure the animation loops
        ease: "easeInOut"  // Use an ease-in-out for smoother animation
      }
    }
  };

  return (
    <Container fluid>
    <Row>
    <AnimatePresence>
        {flims.map((flim) => (
          <InView threshold={0.2} triggerOnce={true} key={flim.id}>
            {({ ref, inView }) => (
            <MotionCol  xs={12} sm={6} variants={FlimVariants} 
            ref={ref}  
            initial='hidden' 
            animate={inView ? 'visible' : 'hidden'} 
            key={flim.id}
            className="my-3">
             <LazyLoadImage
              alt='Bar image'
              src={flim.src} // use normal src attribute to set the source
              effect="blur" // Optional: choose the effect you want
              className='sfCardImage'
            />
            <motion.button  variants={redirectVariants} whileHover="hover" onClick={() => handleFlimClick(flim.id)} className='sfButton my-2' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <p className='m-0 p-0'>{`Watch ${flim.title}`}</p>
            <span>
            <FaArrowRight />
            </span>
            </motion.button>
            </MotionCol>
             )}
       </InView>
        ))}
        </AnimatePresence>
        </Row>
    </Container>
  );
};

export default ShortFlimCard;
