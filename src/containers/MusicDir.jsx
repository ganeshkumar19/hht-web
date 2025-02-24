import React from 'react'
import { Container, Row, Col, Image, Card } from 'react-bootstrap'
import '../assets/styles/musicdirectorstyles.css'
import HT from '../assets/images/hip.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons'; 
import A1 from '../assets/images/a1.jpg'
import AM from '../assets/images/ambala.jpg'
import AL from '../assets/images/alam.jpg'
import AR from '../assets/images/ar.jpg'
import VRV from '../assets/images/vrv.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { Autoplay, EffectCube, Pagination} from 'swiper/modules';
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer';

const MusicDir = () => {
  
  const MotionCol = motion(Col);

  const textMusicVariants = {
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

  const buttonMusicVariants ={
    hidden: {
      opacity: 0,
       x: 100
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


  const mdDetails= [
    {movie: 'Aambala', icon: faMusic},
    {movie: 'A1 Express', icon: faMusic},
    {movie: 'Aalambana', icon: faMusic},
    {movie: 'Action', icon: faMusic},
    {movie: 'Agent', icon: faMusic},
    {movie: 'Aranmanai 2', icon: faMusic},
    {movie: 'Aranmanai 4', icon: faMusic},
    {movie: 'Kaththi Sandai', icon: faMusic},
    {movie: 'Comali', icon: faMusic},
    {movie: 'Dhruva', icon: faMusic},
    {movie: 'Krishnarjuna Yudham', icon: faMusic},
    {movie: 'Kavan', icon: faMusic},
    {movie: 'Meesaya Murukku', icon: faMusic},
    {movie: 'Mr. Local', icon: faMusic},
    {movie: 'PT Sir', icon: faMusic},
    {movie: 'Sivakumarin Sabadham', icon: faMusic},
    {movie: 'Imaikkaa Nodigal', icon: faMusic},
    {movie: 'Indru Netru Naalai', icon: faMusic},
    {movie: 'Thani Oruvan', icon: faMusic},
    {movie: 'Kalakalappu 2', icon: faMusic},
    {movie: 'Kathakali', icon: faMusic},
    {movie: 'Vantha Rajavathaan Varuven', icon: faMusic},
 ]

  const swiperImages = [
    {src: AR, alt: 'swiperImage'},
    {src: A1, alt: 'swiperImage'},
    {src: AL, alt: 'swiperImage'},
    {src: VRV, alt: 'swiperImage'},
  ]

  return (
    <Container fluid className="musicDirContainer">
        <Row className='m-0 p-0'>
        <InView threshold={0.3} triggerOnce={true}>
        {({ ref, inView }) => (
          <MotionCol 
            xs={12} 
            lg={6} 
            variants={textMusicVariants} 
            ref={ref}  
            initial='hidden' 
            animate={inView ? 'visible' : 'hidden'} 
            className='m-0 p-0 d-flex flex-column align-items-center'>
              <p className='m-0 px-0 musicDirName'>HIPHOP<br></br>TAMIZHA</p>
              <div className='mdContainer mx-2 p-2 md-p-2 lg-p-5 mt-4'>
                <p className='mdtext'>as a Music Director</p>
              </div>
              <Swiper
                effect='cube'
                grabCursor={true}
                cubeEffect={{ shadow: true, slideShadows: true, shadowOffset: 20, shadowScale: 0.94 }}
                pagination={true}
                modules={[EffectCube, Pagination, Autoplay]}
                autoplay={{
                  delay: 2500,  // Set the delay to 2.5 seconds
                  disableOnInteraction: false  // Continue autoplay even after user interaction
                }}
                className="musicSwiper mt-3 mx-5"
              >
                {swiperImages.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <Image loading='lazy' src={img.src} alt={img.alt} className="musicImage"/>
                  </SwiperSlide>
                ))}
              </Swiper>
            </MotionCol>
             )}
          </InView>
            <Col xs={12} lg={6} className='pt-5 p-2'>
            <Row className='m-0 p-0'>
            {mdDetails.map((detail, index) => (
            <InView threshold={0.3} triggerOnce={true} key={index}>
            {({ ref, inView }) => (
              <MotionCol xs={6} md={4} lg={6} xl={4} 
              key={index}
              variants={buttonMusicVariants} 
              ref={ref}  
              initial='hidden' 
              animate={inView ? 'visible' : 'hidden'} 
              className="mb-4 d-flex align-items-stretch p-0">
                <Card className='musicCard position-relative mx-auto'>
                  <div className='iconContainer position-absolute'>
                    <FontAwesomeIcon icon={detail.icon} size="1x" />
                  </div>
                  <Card.Body>
                    <Card.Title className='text-center titleText'>{detail.movie}</Card.Title>
                  </Card.Body>
                </Card>
              </MotionCol>
              )}
          </InView>
            ))}
          </Row>
            </Col>

        </Row>
    </Container>
  )
}

export default React.memo(MusicDir)