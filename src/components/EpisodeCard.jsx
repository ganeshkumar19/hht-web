import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import '../assets/styles/barcardstyles.css'
import { FaArrowRight } from "react-icons/fa";
import {motion} from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../assets/styles/episodecardstyles.css'

const EpisodeCard = ({episodes}) => {

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
        {episodes.map((episode) => (
            <Col key={episode.episodeId} xs={12} sm={6} md={6} xl={4} className="my-3">
             <LazyLoadImage
              alt='ep image'
              src={episode.epSrc} 
              placeholderSrc={episode.epSrc}// use normal src attribute to set the source
              effect="blur" // Optional: choose the effect you want
              className='episodeCardImage'
            />
            <motion.a  variants={redirectVariants} whileHover="hover" href='#' target="_blank" rel="noopener noreferrer" className='epButton my-2' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <p className='m-0 p-0'>{`Watch ${episode.name}`}</p>
            <span>
            <FaArrowRight />
            </span>
            </motion.a>
            </Col>
        ))}
        </Row>
    </Container>
  )
}

export default EpisodeCard