import React from 'react'
import { useParams } from 'react-router-dom';
import { useShortFlims } from '../../contexts/ShortFlimsContext';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { FaArrowRight } from "react-icons/fa";
import {motion, transform} from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import EpisodeCard from '../../components/EpisodeCard';
import '../../assets/styles/sfepisodestyles.css'
import HeaderCard from '../../components/HeaderCard';


const ShortFlimEpisodes = () => {
    const { shortflimId } = useParams();
    const { shortFlims } = useShortFlims();
    const flim = shortFlims.find(f => f.id === parseInt(shortflimId));

    const MotionContainer = motion(Container);


  
  return (
    <Container fluid className='sfEpisodeContainer'>
    <HeaderCard backgroundColor={"#F5BE49"} color={"#57A5BB"} name={"Episodes"}/>
    <MotionContainer fluid className='my-3 ms-1'>
        <Row>
          {flim.episodes.length > 0 ? (
            <Col xs={12}>
              <p className='sfText'>{flim.title}</p>
              <EpisodeCard episodes={flim.episodes} />
            </Col>
          ) : (
          <motion.div variants={textVariants} initial='hidden' animate='visible' className='cmSoonContainer d-flex justify-content-center align-items-center my-3'>
            <Image fluid src={CSM} className='csmImage'/>
           </motion.div>
          )}
        </Row>
      </MotionContainer>
  </Container>
  )
}

export default ShortFlimEpisodes