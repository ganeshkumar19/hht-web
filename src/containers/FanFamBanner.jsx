import React from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import '../assets/styles/fanfamstyles.css'
import Setting from "../assets/images/setting.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import LoginGif from '../assets/images/Logingif.gif'
import SigninGif from '../assets/images/Signingif.gif'
import {easeIn, motion} from 'framer-motion'
import { InView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';


const FanFamBanner = () => {
  const { isAuthenticated } = useAuth();
  const MotionCol = motion(Col)
  const { toggleLoginModal } = useLogin();
  const navigate = useNavigate();


  const handlefanFamClick = () => {
    if (localStorage.getItem('access_token')) {
        navigate('/fanfam'); 
    } else {
      toggleLoginModal();
    }
  };




  const leftBannerVariants={
    hidden: {
        opacity: 0,
        x: -100
    },
    visible:{
        opacity: 1,
        x:0,
        transition: {
            type: 'spring',
            stiffness: 160,
            damping: 24,
            delay: 0.1 // starts after the container starts animating
        }
    }
  }

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
    <Container fluid className="fanFamContainer">
        <Row>
            <InView threshold={0.2} triggerOnce={true}>
              {({ ref, inView }) => (
                  <MotionCol lg={isAuthenticated ? 12 : 8} xs={12}  variants={leftBannerVariants}  
                  ref={ref}  
                  initial='hidden' 
                  animate={inView ? 'visible' : 'hidden'} 
                  className={isAuthenticated ? 'authenBanner': 'left-banner d-flex flex-column justify-content-center align-items-center py-4'}>
                 
                   <div className='d-flex align-items-center justify-content-center fanBtnContainer' onClick={handlefanFamClick}>
                   <button to='/fanfam' className="FanFamButton"  style={{width: '100%'}}> #FANFAM <FontAwesomeIcon icon={faArrowRight} style={{width: '20px'}}/>
                  </button>
                  </div>
                 
                  <div className="my-3 text-center">
                        <img src={Setting} alt="settingImage" className='settingImage' />
                  </div>
                  </MotionCol>
                  )}
            </InView>
            {!isAuthenticated && (
            <InView threshold={0.2} triggerOnce={true}>
            {({ ref, inView }) => (
            <MotionCol variants={rightBannerVariants} 
              ref={ref}  
              initial='hidden' 
              animate={inView ? 'visible' : 'hidden'} 
              lg={4} xs={12} 
              className='right-banner m-0 p-0'>
                <Row className='image-container m-0 p-0'>
                    <Col lg={12} md={6} sm={6} xs={6} className='m-0 p-0'>
                    <div className="image-box m-0 p-0">
                    <Link to='/login'>
                        <Image fluid src={LoginGif} alt="UGT" />
                    </Link>
                    </div>
                    </Col>
                    <Col lg={12} md={6} sm={6} xs={6} className='m-0 p-0'>
                    <div className="image-box m-0 p-0">
                    <Link to='/login'>
                        <Image fluid src={SigninGif} alt="Eye" />
                        </Link>
                    </div>
                    </Col>
                </Row>
          </MotionCol>
           )}
          </InView>
            )}
        </Row>
    </Container>
  )
}

export default React.memo(FanFamBanner)