import React from 'react';
import { motion } from 'framer-motion';
import FAV from '../assets/images/hhtlogo.png';  // Ensure the path is correct

const imageVariants = {
  spin: {
    rotate: 360,
    transition: {
      duration: 2,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

const LoaderComponent = () => (
  <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#57A5BB'}}>
    <div className="pageloader">
      <motion.img 
        src={FAV} 
        alt="Loading..." 
        className="pageloader-image"
        variants={imageVariants}
        animate="spin"
      />
    </div>
  </div>
);

export default LoaderComponent;