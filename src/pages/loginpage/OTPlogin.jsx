import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap'
import LOGINLOGO from '../../assets/images/hhtlogo.png'
import '../../assets/styles/otploginstyles.css'
import { FaGoogle } from 'react-icons/fa';
import LOGINSTAR from '../../assets/images/loginstar.png'
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';
import { RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { confirmOtpCode } from '../../functions/confirmationCode';
import { registerUser } from '../../apifunctions/registerUser';
import { storeUserDataInLocalStorage } from '../../functions/storage';
import { useUserStatus } from '../../functions/useUserStatus';

const OTPlogin = () => {
  const [number, setNumber] = useState('')
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(90);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();
  const handleUserStatus = useUserStatus();


useEffect(() => {
    if (otpRequested) {
        const countdown = setInterval(() => {
            setTimer((prevTime) => prevTime > 0 ? prevTime - 1 : 0);
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(countdown);
    }
  }, [otpRequested]);

  const maskMobileNumber = (number) => {
    if (number.length <= 5) return number;  // Return the number as is if it's too short to mask
    let masked = number.substring(0, 3) + '*'.repeat(number.length - 5) + number.substring(number.length - 2);
    return masked;
  };


  const handleGoogleSignIn = async () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isInAppBrowser = userAgent.includes("instagram") || userAgent.includes("fb") || userAgent.includes("facebook") || userAgent.includes("snapchat");

    if (isInAppBrowser) {
        toast.warn('For a secure login, kindly use our website directly.', { autoClose: 5000 });
        return; // Exit the function early if in an in-app browser
    }
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        const loginType = 'email'; 
        const verificationType= 'Gmail';
        const response = await registerUser(user.email, loginType);

        if (response.data && response.data.user) {
            storeUserDataInLocalStorage(response.data);
            handleUserStatus(response.data.user, response.data.token, loginType, verificationType);
        } else {
            throw new Error('User data is missing from the response');
        }
    } catch (error) {
        console.error('Google sign-in error:', error);
        toast.error('Google sign-in failed. Please try again.');
    }
};

  

const setupRecaptcha = (elementId) => {
  if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();  
  }
  window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
      'size': 'invisible'
  });
  window.recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
  });
};

const sendOtp = async () => {

  if (!number) {
    toast.error('Please enter your mobile number.');
    return;
  }

  // Basic validation for a valid Indian phone number (10 digits)
  if (!/^[6-9]\d{9}$/.test(number)) {
    toast.error('Please enter a valid mobile number.');
    return;
  }
  setIsSendingOtp(true);
  try {
      setupRecaptcha('recaptcha');
      const confirmation = await signInWithPhoneNumber(auth, `+91${number}`, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setOtpRequested(true);
      toast.info('OTP sent successfully');
  } catch (err) {
      console.error('Failed to send OTP:', err);
      toast.error("Failed to send OTP. Please try again.");
  }
  setIsSendingOtp(false);
};
  
  const reSendOtp = async () => {
    setTimer(90);
    try {
      // Reuse the same verifier if it already exists
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();  // Clear the existing verifier
      }
      window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha', {
        'size': 'invisible',
      });
  
      window.recaptchaVerifier.render();
      const confirmation = await signInWithPhoneNumber(auth, `+91${number}`, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      toast.info('OTP resent successfully');
    } catch (err) {
      console.error('Failed to resend OTP:', err);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    setIsVerifyingOtp(true);
    try {
        const code = otp.join('');
        const result = await confirmOtpCode(confirmationResult, code);
        const loginType = 'phone';  
        const verificationType= 'OTP' 
        const response = await registerUser(result.user.phoneNumber, loginType);

        storeUserDataInLocalStorage(response.data);

        if (response.data && response.data.user) {
            handleUserStatus(response.data.user, response.data.token, loginType, verificationType);
        } else {
            throw new Error('User data is missing from the response');
        }
    } catch (error) {
        console.error('Verification error:', error);
        toast.error(error.message || "OTP verification failed.");
    }
    setIsVerifyingOtp(false);
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
        delay: 0.4,
        duration: 0.5,
      }
    }
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      y: -85
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
          type: 'spring',
          stiffness: 110,
          damping: 4,
          delay: 0.1,
          duration: 1,
      }
  }
  };

   
    const MotionImage = motion(Image);
    const imageVariants = {
        breathe: {
          scale: [1, 1.4, 1],
          transition: {
            duration: 1.6,
            ease: [0.6, 0.01, -0.05, 0.9],
            repeat: Infinity,
            repeatType: "loop"
          }
        }
    };

    const handleChange = (element, index) => {
      if (isNaN(element.value)) return false;
      setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

      // Focus next input
      if (element.nextSibling) {
          element.nextSibling.focus();
      }
  };

  const handleKeyDown = (e, index) => {
      // Move to previous input box if Backspace key is pressed
      if (e.key === "Backspace" && otp[index] === "") {
          if (e.target.previousSibling) {
              e.target.previousSibling.focus();
          }
      }
  };

  return (
   <Container fluid className='otploginContainer d-flex flex-column align-items-center justify-content-center'>
     <MotionImage fluid src={LOGINSTAR} className='loginStarTopLeft' alt='Top left star' variants={imageVariants} 
                animate="breathe"/> 
     <MotionImage src={LOGINSTAR} className='loginStarBottomRight' alt='Bottom right star'  variants={imageVariants} 
                animate="breathe"/>
    <Row>
        <Col xs={12}>
         <motion.div variants={logoVariants}  initial='hidden' whileInView='visible'   className='loImageContainer d-flex justify-content-center align-items-center'>
            <Image fluid src={LOGINLOGO} alt='loginlogo' className='loginlogo' aria-label='login-logo'/>
         </motion.div>
        </Col>
        <Col xs={12} className='m-0'>
         <div className='hhtNameContainer d-flex justify-content-center align-items-center'>
           <p className='hellohhttext'>Hello HHT’ian</p>
         </div>
        </Col>
      
        <Col xs={12}  className='m-0 mt-2 mb-4'>
             {!otpRequested ? (
      <InView threshold={0.5} triggerOnce={true}>
      {({ ref, inView }) => (
         <motion.div ref={ref} 
         variants={containerVariants} 
         initial='hidden' 
         whileInView={inView ? 'visible' : 'hidden'} 
         className='hhtLoginContainer my-4'>
           <p className='mntext'>Mobile Number</p>
           <div className='otpinputContainer ms-2 py-2'>
            <input type='tel' className='otpTextinput' value={number} onChange={(e)=> setNumber(e.target.value)} aria-label='otpTextinput' placeholder='Enter your mobile number'/>
           </div>
           <div className='otpButtonContainer d-flex flex-column justify-content-center align-items-center py-2'>
           <button className='otpbutton' onClick={sendOtp} disabled={isSendingOtp}>
                {isSendingOtp ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Get OTP"}
           </button>
            <div id='recaptcha' style={{marginTop: '10px'}}></div>
         </div>
         <div className='orContainer d-flex  justify-content-center align-items-center py-1'>
            <p className='orContainerText m-0 p-0'>Or</p>
         </div>
         <div className='googleSignInContainer d-flex justify-content-center align-items-center py-4'>
              <button onClick={handleGoogleSignIn} className='googleButton'>
                <FaGoogle size={20} color="#DB4437" />
                </button>
         </div>
       {/* <div className='dnaContainer d-flex flex-column justify-content-center align-items-center py-1'>
              <p className='my-1 p-0 dnaText'>Don’t have an account?</p>
              <p className='m-0 mb-1 p-0 dnaRegisterText'>Register</p>
         </div>*/}
         </motion.div>
            )}
    </InView>
         ) : (
          <div className='otpVerifyContainer p-3 d-flex flex-column justify-content-center align-items-center'>
          <div className='otvContainer'>
              <p className='otvsText m-0 p-0 my-1 text-center'>OTP Verification</p>
              <p className='otvnumText m-0 p-0 my-1 text-center'>Code sent to {maskMobileNumber(number)}</p>
          </div>
          <div className='otpSection'>
              <div className='otpInputBoxes d-flex justify-content-center'>
                  {otp.map((data, index) => (
                      <input
                          className="otpBox"
                          type="tel"
                          name="otp"
                          maxLength="1"
                          key={index}
                          value={data}
                          onChange={e => handleChange(e.target, index)}
                          onFocus={e => e.target.select()}
                          onKeyDown={e => handleKeyDown(e, index)}
                          inputMode="numeric"
                          autoComplete={index === 0 ? "one-time-code" : "off"} 
                      />
                  ))}
              </div>
              <div className='resendOtpContainer d-flex justify-content-end align-items-center py-1'>
                  {timer > 0 ? (
                      <span className='timerspan'>{Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</span>
                  ) : (
                      <p className='resendOtpText'>Haven’t got the code yet? <span style={{ color: '#E84325', textDecoration: 'underline' }} onClick={reSendOtp}>Resend OTP</span></p>
                  )}
              </div>
          </div>
          <div className='otpButtonContainer d-flex justify-content-center align-items-center py-4'>
            <button className='otpbutton' onClick={verifyOtp} disabled={isVerifyingOtp}>
                {isVerifyingOtp ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Verify OTP"}
            </button>
            </div>
      </div>
         )}
        </Col>
     
    </Row>
   </Container>
  )
}

export default OTPlogin