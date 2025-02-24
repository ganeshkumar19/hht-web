import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AA from "../assets/images/aa.png";
import MM from "../assets/images/mm.png";
import PT from "../assets/images/pt.png";
import NT from "../assets/images/nt.png";
import NS from "../assets/images/ns.png";
import Veeran from "../assets/images/veeran.png";
import SS from "../assets/images/ss.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import '../assets/styles/movieListstyles.css'
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import KUP from '../assets/images/kup.png'

const MovieListBanner = () => {

    const MotionCol = motion(Col);

    const textVariants = {
        hidden: {
            opacity: 0,
            y: -50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.3,
                duration: 1,
            }
        }
      }
    
      const imageVariants ={
        hidden: {
          opacity: 0,
           x: -100
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

    const images = [
        { src: MM, alt: "Eternals" },
        { src: NT, alt: "Guardians Of The Galaxy" },
        { src: NS, alt: "Justice League" },
        { src: SS, alt: "Justice League" },
        { src: AA, alt: "Justice League" },
        { src: Veeran, alt: "Justice League" },
        { src: PT, alt: "Justice League" },
        { src: KUP, alt: "Justice League" },

      ];
  return (
    <Container fluid className='mlContainer'>
        <Row>
        <InView threshold={0.2} triggerOnce={true}>
        {({ ref, inView }) => (
            <MotionCol xs={12} 
            variants={textVariants} 
            ref={ref}  
            initial='hidden' 
            animate={inView ? 'visible' : 'hidden'} 
             className='mb-2'>
             <Row className='d-flex justify-content-center align-items-center'>
                <Col sm={5} md={5} lg={5}>
                 <p className='movieHeadingText'>Movies</p>
                </Col>
                <Col sm={5} md={6} lg={6}>
                <p className='movieActorText'>as Actor</p>
                </Col>
                <Col sm={2} md={1} lg={1}>
                <p className='movieHeadingDate'>2017-<br className="date-break"/>2024</p>
                </Col>
             </Row>
            </MotionCol>
            )}
       </InView>
       <InView threshold={0.3} triggerOnce={true}>
       {({ ref, inView }) => (
            <MotionCol 
            variants={imageVariants} 
            ref={ref}  
            initial='hidden' 
            animate={inView ? 'visible' : 'hidden'}  
            xs={12}
            >
            <Swiper
                breakpoints={{
                    320: {  // Covers smaller devices
                    slidesPerView: 2,
                    spaceBetween: 20
                    },
                    564: {  // Covers medium to larger devices
                    slidesPerView: 3,
                    spaceBetween: 20
                    },
                    768: {  // Covers medium to larger devices
                    slidesPerView: 4,
                    spaceBetween: 15,
                    }
                }}
                pagination={false}
                autoHeight={true}
                modules={[Pagination]}
                className="movieListSwiper"
                >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className='movieListSlider'>
                    <img src={image.src} alt={image.alt} className="sliderMovieImage"/>
                    </SwiperSlide>
                ))}
                </Swiper>

            </MotionCol>
            )}
       </InView>
        </Row>
    </Container>
  )
}

export default React.memo(MovieListBanner)