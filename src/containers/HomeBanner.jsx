import React, { memo, useState } from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import '../assets/styles/homebannerstyles.css';
import Login from "../assets/images/login.png";
import Join from "../assets/images/join.png";
import Eye from "../assets/images/mvmtgif.gif";
import Circle from "../assets/images/musicgif.gif";
import Final from "../assets/images/moviesgif.gif";
import UGT from "../assets/images/ugtgif.gif";
import { InView } from 'react-intersection-observer';
import { easeIn, motion } from 'framer-motion';
import {Link} from 'react-router-dom'
import { useUserDetails } from '../contexts/UserContext';
import { useLogin } from '../contexts/LoginContext';
import { useAuth } from '../contexts/AuthContext';
import 'react-lazy-load-image-component/src/effects/blur.css';


const HomeBanner = () => {
  const { userDetails } = useUserDetails();
  const MotionContainer = memo(motion(Container));
  const MotionCol = memo(motion(Col));
  const { toggleLoginModal } = useLogin();
  const { isAuthenticated } = useAuth();


  const imageData = [
    { src: UGT, alt: "UGT", url: "https://www.youtube.com/@UndergroundTribe" },
    { src: Eye, alt: "Eye", url: "https://www.youtube.com/watch?v=V9LChBJ1-B0" },
    { src: Circle, alt: "Circle", url: "https://open.spotify.com/artist/7zFBW2JxM4bgTTKxCRcS8Q?si=UCd4ylEQT0y1JEkaP6dsAw&nd=1&dlsi=9be2428d231b4f0b" },
    { src: Final, alt: "Final", url: "https://www.amazon.com/prime-video/actor/Hiphop-Tamizha-Adhi/amzn1.dv.gti.3e1c203b-4dc2-4fad-81a3-4388f9d0de8e/" }
  ];




  
const handleRedirect = (url) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
      window.open(url, '_blank');
  } else {
      toggleLoginModal();
  }
};



  const leftBannerVariants = {
    hidden: {
      opacity: 0,
      x: -100
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 160,
        damping: 24,
        delay: 0.2 // starts after the container starts animating
      }
    }
  };

  const rightBannerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 160,
        damping: 24,
        delay: 0.6,
      }
    }
  };

  return (
    <MotionContainer fluid className='homeMainContainer'>
      <Row>
        <InView threshold={0.2} triggerOnce={true}>
          {({ ref, inView }) => (
            <MotionCol variants={leftBannerVariants} ref={ref} lg={6} initial='hidden' animate={inView ? 'visible' : 'hidden'} className='textBanner text-center p-4'>
              <h1 className='headerText'>HIPHOP <br /> TAMIZHA</h1>
              <p className='headerParagraph'>Hustlers, Artists & Entrepreneurs</p>
              {/*<img src={Tiny} alt="small-image" className='my-2' />*/}
              {isAuthenticated ? (
                                <p className='loginWlText mt-4'>Welcome, {userDetails?.display_name || 'User'}</p>
                            ) : (
                                <div className="d-flex justify-content-around bottom-btns">
                                    <div className="login">
                                        <Link to='/login'>
                                            <Image fluid src={Login} className='loginbtn' alt="Login" />
                                        </Link>
                                    </div>
                                    <div className="join">
                                      <Link to='/login'>
                                              <Image fluid src={Join} className='joinbtn' alt="Join" />
                                      </Link>
                                    </div>
                                </div>
                            )}
            </MotionCol>
          )}
        </InView>
        <InView threshold={0.1} triggerOnce={true}>
          {({ ref, inView }) => (
            <MotionCol variants={rightBannerVariants} ref={ref} lg={6} initial='hidden' animate={inView ? 'visible' : 'hidden'}   className='right-main-banner m-0 p-0'>
              <Row className='image-container m-0 p-0'>
              {imageData.slice(0, 2).map((item, index) => (
                  <Col sm={6} xs={6} className="m-0 p-0" key={index}>
                    <div onClick={() => handleRedirect(item.url)} className="image-box m-0 p-0">
                      <Image
                      className='lazyimage'
                      src={item.src} 
                      alt={item.alt}
                      loading="lazy"
                      />
                    </div>
                  </Col>
                ))}
              </Row>
              <Row className='image-container m-0 p-0'>
              {imageData.slice(2).map((item, index) => (
                  <Col sm={6} xs={6} className="m-0 p-0" key={index + 2}>
                    <div onClick={() => handleRedirect(item.url)} className="image-box m-0 p-0">
                      <Image
                      className='lazyimage'
                      src={item.src} 
                      alt={item.alt} 
                      loading="lazy"
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </MotionCol>
          )}
        </InView>
      </Row>
    </MotionContainer>
  )
}

export default React.memo(HomeBanner);