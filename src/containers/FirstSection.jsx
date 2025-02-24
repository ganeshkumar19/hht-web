import React from "react";
import Frame from "../assets/images/merchgif.gif";
import Flower from "../assets/images/eventgif.gif";
import Arrow from "../assets/images/arrow.png";
import Insta from "../assets/images/insta.png";
import Fb from "../assets/images/fb.png";
import Youtube from "../assets/images/youtube.png";
import Twitter from "../assets/images/twitter.png";
import '../assets/styles/firstsectionstyles.css'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const iconLinks = [
  { src: Insta, alt: "Instagram", link: 'https://www.instagram.com/hiphoptamizha' },
  { src: Fb, alt: "FaceBook", link: 'https://www.facebook.com/hiphoptamizha' },
  { src: Youtube, alt: "Youtube", link: 'https://www.youtube.com/user/hiphoptamizha' },
  { src: Twitter, alt: "Twitter", link: 'https://www.twitter.com/hiphoptamizha' },
];



const FirstSection = () => {
  const MotionContainer = motion(Container);
  const navigate = useNavigate();

  // Remove access token check and login modal
  const handleMerchClick = () => {
    navigate('/merch'); // Directly navigate to the merchandise page
  };

  const handleEventClick = () => {
    navigate('/events');
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 85
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
      }
    }
  };

  const ImageData = [
    {src: Frame, alt: 'Merchandise', link: handleMerchClick},
    {src: Flower, alt: 'Events', link: handleEventClick}
  ]

  return (
    <>
      <InView threshold={0.2} triggerOnce={true}>
        {({ ref, inView }) => (
          <MotionContainer
            fluid
            ref={ref}
            variants={containerVariants}
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
            className="firstSectionContainer"
          >
            <Row className="flex-lg-row-reverse">
              <Col lg={7} xl={8} xs={12} className='right-section d-flex flex-column justify-content-center align-items-center py-4'>
                <div className="right-text-section m-2 text-center">
                  <p className="artistText">The Artists Have Landed.</p>
                  <p className="descText">Art isn't just expression. It's politics, it's a dialogue, it's a debate.</p>
                  <img src={Arrow} alt="arrow" className="m-2" />
                </div>
                <div className="d-flex justify-content-center align-items-center iconSectionContainer gap-3 gap-sm-4 gap-md-5 mt-4 mb-3">
                  {iconLinks.map((icon, index) => (
                    <a
                      href={icon.link}
                      target="_blank"
                      key={index}
                      rel="noopener noreferrer"
                      className="iconSectionLink"
                    >
                      <img src={icon.src} alt={icon.alt} className="iconSectionImage" />
                    </a>
                  ))}
                </div>
              </Col>
              <Col lg={5} xl={4} xs={12} className='right-banner m-0 p-0'>
                <Row className='image-container m-0 p-0'>
                  {ImageData.map((img, index)=>(
                     <Col lg={12} md={6} sm={6} xs={6} className='m-0 p-0' key={index}>
                     <div className="bar-image m-0 p-0" onClick={img.link}>
                       <img src={img.src} alt={img.alt} className="merchimage" loading="lazy"/>
                     </div>
                   </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </MotionContainer>
        )}
      </InView>
    </>
  );
};

export default React.memo(FirstSection);