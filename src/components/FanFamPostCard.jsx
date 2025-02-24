import React, { useState } from 'react'
import { Image} from 'react-bootstrap'
import PP from '../assets/images/ppimage.png'
import { IoMdHeartEmpty } from "react-icons/io";
import '../assets/styles/fanfampoststyles.css'
import {motion } from 'framer-motion'

const FanFamPostCard = ({ post }) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleFocus = () => {
    setShowPopup(true);
  };

const textVariants = {
    hidden: {
      opacity: 0,
       y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.4,
      }
    }
  }

  // Function to hide the popup
  const handleBlur = () => {
    setShowPopup(false);
  };

  return (
    <div className='postCardContainer p-2 my-4'>
      <div className='ppContainer d-flex align-items-center ms-1'>
        <div className="ppimagecontainer me-2">
          <Image fluid src={post.prImage} className='ppimage' alt='profilepic' aria-label='profilepic'/>
        </div>
        <div className='ppTextContainer'>
          <p className='m-0 p-0 ppnametext'>{post.prName}</p>
          <p className='m-0 p-0 pplocationtext'>{post.prLocation}</p>
        </div>
      </div>
      <div className='postDesContainer ms-1 my-2'>
        <p className='postDesText'>{post.desc} <span style={{color: '#1D9BF0', textDecoration: 'underline'}}>{post.span}</span></p>
      </div>
      <div className='postImageContainer my-2'>
        <Image fluid src={post.src} className='postImage1' alt='postimage' aria-label='postimage'/>
      </div>

      <div className='commentInputContainer'>
        <IoMdHeartEmpty  className='FaHeart'/>
        <div className='commentTextinputContainer'>
        <input
            type='text'
            placeholder='Write a Comment'
            className='postTextInput'
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button className='sendButton' onClick={() => ('Send comment')}>Send</button>
        </div>
      </div>
      {showPopup && (
        <motion.div variants={textVariants} initial='hidden' animate='visible' className='commentPopup'>
          <p>Type your comment here...</p>
        </motion.div>
      )}

    </div>
  );
}

export default FanFamPostCard