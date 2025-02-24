import React from 'react'
import LOGINSTAR from '../assets/images/loginstar.png'
import '../assets/styles/namecardstyles.css'
import { Image } from 'react-bootstrap'

const HeaderCard = ({backgroundColor, color, name}) => {
  return (
    <div className='nameCardContainer' style={{backgroundColor: backgroundColor}}>
    <h3 className='mt-2' style={{color: color}}>{name}</h3>
    <Image src={LOGINSTAR} className='conLoginStarLeft'/>
    <Image src={LOGINSTAR} className='conLoginStarRight'/>
  </div>
  )
}

export default HeaderCard