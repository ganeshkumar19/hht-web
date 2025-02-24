import React, { useState } from 'react'
import {motion } from 'framer-motion'
import './anistyles.css'



const textVariants = {
    hidden: {
      opacity: 0,
       y: -100
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

const boxVariants = {
    hidden: {
      opacity: 0,
       y: 100
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

const AnimationText = () => {
    const [name, setName] = useState('')
    const [visible, setVisible] = useState(false)

    const handleButtonClick = ()=>{
        setVisible(!visible)
    }
  return (
    <>
    <motion.div className='aniContainer' variants={textVariants} initial='hidden' animate='visible'>
        <input type='text' value={name} onChange={(e)=> setName(e.target.value)}></input>
        <button onClick={handleButtonClick}>Visible</button>
    </motion.div>
    <motion.div className='aniGreenContainer' variants={boxVariants} initial='hidden' animate='visible'>
        <input type='text'></input>
        <button onClick={handleButtonClick}>Visible</button>
    </motion.div>
    </>

  )
}

export default AnimationText