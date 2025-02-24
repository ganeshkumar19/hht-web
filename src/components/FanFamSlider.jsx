import React, { useRef, useState } from 'react';
// Import Swiper React components
import '../assets/styles/ffsliderstyles.css'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ImGlass } from 'react-icons/im';
import BAR from '../../src/assets/images/Bar1.png'

const FanFamSlider = ({ images }) => {
   

  const handleImageClick = (url) => {
    window.open(url, '_blank'); 
};
    

    return (
      <Container fluid>
        <Row className='p-0'>
        {images.map((img, index) => (
          <Col xs={12} key={index} className='fanfamswiperSlider m-0 my-2'  onClick={() => handleImageClick(img.link)}>
            <div className="imageWrapper">
            <LazyLoadImage src={img.src} alt={`Slide ${index}`} className="ff-slider-image"  effect="blur" placeholderSrc={BAR} />
              <div className='sliderImageTextContainer'>
                <p className='slideHeadText m-0'>{img.title}</p>
                <p className='slideDateText m-0'>{img.info}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
     </Container>
    );
}

export default FanFamSlider;

