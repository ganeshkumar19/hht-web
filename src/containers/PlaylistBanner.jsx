import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import PLAYLIST from '../assets/images/playlist.png';
import NT from '../assets/images/nt.png';
import Music from "../assets/images/music.png";
import Spot from "../assets/images/spotify.png";
import You from "../assets/images/youtube.png"; // Ensure this is the correct import if "You" is used as YouTube's icon.
import '../assets/styles/playliststyles.css'
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer';

const PlaylistBanner = () => {
  const MotionCol = motion(Col)

  const textVariants = {
    hidden: {
      opacity: 0,
       y: -50
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
       x: -75
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.6,
        duration: 1,
      }
    }
  }

  const playListDetails = [
    {
      listimage: NT, 
      text: 'Mellow VIBE',
      socialMedia: [
        { name: "Spotify", icon: Spot, alt: "Spotify", link: "https://open.spotify.com/playlist/4R4xPwnl2cxtana8vhkR2v" },
        { name: "Amazon Music", icon: Music, alt: "Music", link: "https://music.amazon.com/user-playlists/8dfd714bac424ba6bc71cec631637fe6sune" },
        { name: "YouTube", icon: You, alt: "YouTube", link: "https://www.youtube.com/watch?v=tQvNJDUhzBQ" }, // Corrected icon usage
      ]
    },
    {
      listimage: NT, 
      text: 'Kuthu party pack',
      socialMedia: [
        { name: "Spotify", icon: Spot, alt: "Spotify", link: "https://open.spotify.com/album/3FhpEFtOnRT3hFkduW1hoz" },
        { name: "Amazon Music", icon: Music, alt: "Music", link: "https://music.amazon.in/albums/B09HJP88KZ" },
        { name: "YouTube", icon: You, alt: "YouTube", link: "https://www.youtube.com/playlist?app=desktop&list=OLAK5uy_nptQremnzB-1Lge_aEhGUm0tHzX3BYUIQ" }, // Corrected icon usage
      ]
    },
    {
      listimage: NT, 
      text: 'Underground jams',
      socialMedia: [
        { name: "Spotify", icon: Spot, alt: "Spotify", link: "https://open.spotify.com/artist/7zFBW2JxM4bgTTKxCRcS8Q" },
        { name: "Amazon Music", icon: Music, alt: "Music", link: "https://music.amazon.in/playlists/B07NRZBFPR" },
        { name: "YouTube", icon: You, alt: "YouTube", link: "https://www.youtube.com/channel/UC3Izrk2fUSIEwdcH0kNdzeQ" }, // Corrected icon usage
      ]
    },
    {
      listimage: NT, 
      text: 'Tamil indie',
      socialMedia: [
        { name: "Spotify", icon: Spot, alt: "Spotify", link: "https://open.spotify.com/track/1vJ1p02lecwnFnYgyzXAh2" },
        { name: "Amazon Music", icon: Music, alt: "Music", link: "https://open.spotify.com/track/1vJ1p02lecwnFnYgyzXAh2" },
        { name: "YouTube", icon: You, alt: "YouTube", link: "https://open.spotify.com/track/1vJ1p02lecwnFnYgyzXAh2" }, // Corrected icon usage
      ]
    }
  ];

  return (
    <Container fluid className="playlistBanner text-center">
      <Row className='p-0 m-0 d-flex flex-column justify-content-center align-items-center'>
        <InView threshold={0.1} triggerOnce={true}>
        {({ ref, inView }) => (
          <MotionCol variants={textVariants} 
            ref={ref}  
            initial='hidden' 
            animate={inView ? 'visible' : 'hidden'} 
            className='playlistImgContainer p-3 m-3'
            xs={12}>
            <Image fluid src={PLAYLIST} alt="playlist" className="Image"/>
          </MotionCol>
            )}
        </InView>
        {playListDetails.map((item, index) => (
          <InView threshold={0.2} triggerOnce={true} key={index}>
          {({ ref, inView }) => (
           <MotionCol key={index} variants={boxVariants} 
           ref={ref}  
           initial='hidden' 
           animate={inView ? 'visible' : 'hidden'}  
           className='d-flex justify-content-center align-items-center' xs={12}>
            <Row  className='textWithImgContainer my-3'>
                <Col xs={2} className='imgListContainer position-absolute'>
                  <Image className='listImage' src={item.listimage}/>
                </Col>
                <Col xs={6} className='textListContainer m-0'> 
                  <p className='textListParagraph'>{item.text}</p>
                </Col>
                <Col xs= {4} className='p-0 m-0 d-flex justify-content-between align-items-center'>
                  {item.socialMedia.map((media, idx) => (
                    <a key={idx} href={media.link} className='iconLink' target='_blank'>
                      <Image src={media.icon} alt={media.alt} className='iconimage' />
                    </a>
                  ))}
                </Col>
            </Row>
          </MotionCol>
          )}
       </InView>
        ))}
      </Row>
    </Container>
  );
}

export default PlaylistBanner;
