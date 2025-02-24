import React from 'react';
import {easeIn, motion} from 'framer-motion'
import { Container, Col } from 'react-bootstrap';
import '../assets/styles/header.css'


const Header = () => {
    const MotionContainer = motion(Container);
    const MotionCol = motion(Col)

    const headerVariants={
        hidden: {
            opacity: 0,
            
        },
        visible:{
            opacity: 1,
            transition: {
                delay: 1.2,
                duration: 1.2,
                when: 'beforeChildren', 
                ease: 'easeIn'// Duration in seconds
            }
        }
   }
   const headerTextVariants={
    hidden: {
        opacity: 0,
        y: '-100vh'
    },
    visible:{
        opacity: 1,
        y:0,
        transition: {
            type: 'spring',
            stiffness: 120,
            damping: 12,
            delay: 0.2 // starts after the container starts animating
        }
    }
  }

  const paragraphVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 120,
            damping: 12,
            delay: 1.0 // starts after the header text animation
        }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: '-100vw' },  // For "Login"
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 1.3,
            type: 'tween',
            stiffness: 120
        }
    }
};

const joinButtonVariants = {
    hidden: { opacity: 0, x: '100vw' },  // For "Join"
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 1.3,
            type: 'tween',
            stiffness: 120
        }
    }
};

const hoverVariants = {
    hover: {
        scale: 1.2,
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        transition: {
            repeat: Infinity,      // This will repeat the animation indefinitely.
            repeatType: 'reverse', // Ensures the animation reverses back to its original state.
            duration: 0.4          // Duration of one cycle of the animation.
        }
    }
};
  return (
    <MotionContainer fluid variants={headerVariants} initial='hidden' animate= 'visible' style={{backgroundColor: '#069754', height: '100vh'}}>
       <div className="row">
                <MotionCol xs={12} variants={headerTextVariants}>
                    <p className='headerText text-center'>HipHop Tamizha</p>
                </MotionCol>
                <MotionCol xs={12} variants={paragraphVariants}>
                    <p className='headerParagraph text-center'>Hustlers, Artists & Entrepreneurs</p>
                </MotionCol>
        </div>
        <div className="row my-5 mx-1"> 
                <MotionCol xs={6} className="d-flex justify-content-center align-items-center" variants={buttonVariants}>
                    <motion.button className='login-button' variants={hoverVariants} whileHover="hover">LOGIN</motion.button>
                </MotionCol>
                <MotionCol xs={6} className="d-flex justify-content-center align-items-center" variants={joinButtonVariants}>
                    <motion.button className='join-button' variants={hoverVariants} whileHover="hover">JOIN</motion.button>
                </MotionCol>
        </div>
    </MotionContainer>
  );
}

export default Header;