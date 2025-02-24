import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../assets/styles/eventcardstyles.css';
import DR from '../assets/images/dragon.png'
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer';


const MotionContainer = motion(Container);

const EventCard = React.memo(({ event }) => {
  const containerVariants = {
    hidden: {
      opacity: 0,
      x: -85
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.4,
        duration: 0.6,
      }
    }
  }
  return (
    <div className='eventCardContainer my-3'>
    <InView threshold={0.2} triggerOnce={true}>
      {({ ref, inView }) => (
    <MotionContainer
      ref={ref} 
      variants={containerVariants} 
      initial='hidden' 
      animate={inView ? 'visible' : 'hidden'}>
        <Row>
          <Col md={6}>
            <div className='cardImageContainer'>
            <img src={event.image} alt="Event Image" className='cardImage' />
            </div>
          </Col>
          <Col md={6} className='textInfoContainer'>
            <div className='text-details-container'>
              <h4>{event.title}<span className='machiText'>Machi</span></h4>
              <p>Venue: <span className='areaText'>{event.venue}</span></p>
              <p>Date: {event.date}</p>
              <a
                href={event.link}
                target="_blank"
               >
              <button>Buy Now</button>
              </a>
            </div>
          </Col>
          <div className='dragonEcContainer'>
                <Image fluid src={DR} alt='dr' className='drcontainerImage'/>
            </div>
         </Row>
        </MotionContainer>
        )}
        </InView>
    </div>
  );
});

export default EventCard;