import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../assets/styles/musicInfoStyles.css';
import APPLE from '../assets/images/apple.png';
import YOUMUSIC from '../assets/images/youmusic.png';
import JIO from '../assets/images/jio.png';
import SPOTIFY from '../assets/images/spotify-2.png';
import WYNK from '../assets/images/wynk.png';
import KAVAN from '../assets/images/kavan.jpg'; 
import TO from '../assets/images/to.jpg' // Assume import is corrected
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import A1 from '../assets/images/a1.jpg'
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer';
import 'swiper/css';
import 'swiper/css/scrollbar';

const MusicInfoBanner = () => {
  const MotionCol = motion(Col)

  const textVariants = {
    hidden: {
      opacity: 0,
       x: -100
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3,
        duration: 1,
      }
    }
  }

  const buttonVariants ={
    hidden: {
      opacity: 0,
       y: -100
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.0,
        duration: 0.5,
      }
    }
  }
  const moviesData = [
    {
      movieName: "KAVAN",
      synopsis: "A budding journalist passionate about ethical, noble, hard-hitting journalism understands the more flourishing ghetto of sensationalism & news fabrication that the Entertainment TV Channel he belongs to, thrives on. When caught in a dilemma of whether to hold for a while or rise in protest, a situation forces him to make a decision that puts him out of work but… there begins his work.",
      bannerImage: KAVAN,
      platforms: [
        { name: "Apple Music", img: APPLE, link: "https://music.apple.com/in/album/kavan-original-motion-picture-soundtrack-ep/1702690076" },
        { name: "YouTube Music", img: YOUMUSIC, link: "https://music.youtube.com/watch?v=7M9hc_PC_Vg&list=PL1aQ2-h_ncMW00xpnwJcIRE8hdjHRflvB" },
        { name: "JioSaavn", img: JIO, link: "https://www.jiosaavn.com/album/kavan/WRGLFCitj8w_" },
        { name: "Spotify", img: SPOTIFY, link: "https://open.spotify.com/album/1ymYftHMdnQda19BbdVuG9" },
        { name: "Wynk", img: WYNK, link: "https://wynk.in/music/album/kavan/pp_DivoKavan" }
      ],
      backgroundColor: "#F5BE49",
      textColor: "#000000"
    },
    {
      movieName: "A1 Express",
      synopsis: "A young man moves to a new town and falls in love with a hockey player. However, he soon finds himself opposing a corrupt politician's plans to take over the ground his girlfriend's team practices on.",
      bannerImage: A1,
      platforms: [
        { name: "Apple Music", img: APPLE, link: "https://music.apple.com/in/album/a1-express-original-motion-picture-soundtrack/1556812140" },
        { name: "YouTube Music", img: YOUMUSIC, link: "https://music.apple.com/in/album/a1-express-original-motion-picture-soundtrack/1556812140" },
        { name: "JioSaavn", img: JIO, link: "https://www.jiosaavn.com/album/a1-express/nSOuAhmxKV0_" },
        { name: "Spotify", img: SPOTIFY, link: "https://open.spotify.com/album/0hEOFNB9mbDArzI1rQE2QE" },
      ],
      backgroundColor: "#15215a",
      textColor: "#ffffff"
    },
    {
      movieName: "Thani 0ruvan",
      synopsis: "A wealthy and powerful scientist commits many medical malpractices for money. Hence, a dutiful police officer sets out to expose him and bring him to justice.",
      bannerImage: TO,
      platforms: [
        { name: "Apple Music", img: APPLE, link: "https://music.apple.com/in/album/thani-oruvan-original-motion-picture-soundtrack/1019452820" },
        { name: "JioSaavn", img: JIO, link: "https://www.jiosaavn.com/album/thani-oruvan/6T8mUI34vOE_" },
        { name: "Spotify", img: SPOTIFY, link: "https://open.spotify.com/album/7AOEe4UzP8MAtjwvzo2lcQ" },
        { name: "Wynk", img: WYNK, link: "https://wynk.in/music/album/thani-oruvan/sm_886445395181" }
      ],
      backgroundColor: "#229174",
      textColor: "#FFFFFF"
    },
    
    // Add more movie objects here if needed
  ];

  return (
    <Swiper
    scrollbar={{
      hide: true,
    }}
      modules={[Scrollbar]}
      className="musicInfoSwiper"
      spaceBetween={50}
      slidesPerView={1}
      autoHeight={true}
    >
      {moviesData.map(movie => (
        <SwiperSlide key={movie.movieName}  className='musicInfoSlider'>
           <Container fluid className="musicInfosContainer" style={{ backgroundColor: movie.backgroundColor }}>
            <Row className='musicInfoRow mt-3 justify-content-center p-2'>
            <InView threshold={0.2} triggerOnce={true}>
              {({ ref, inView }) => (
             <MotionCol variants={textVariants} 
             ref={ref}  
             initial='hidden' 
             animate={inView ? 'visible' : 'hidden'} 
              xs={12} >
                <Row>
                  <Col xs={12} lg={2} className='p-0 m-0'>
                    <div className='hiBox mt-4 d-flex justify-content-center'>
                      <p className='boxText'>{movie.movieName}</p>
                    </div>
                  </Col>
                  <Col xs={12} lg={7} className='p-0 m-0'>
                    <div className='synopsisContainer mx-4'>
                      <h3 className='snHeading' style={{ color: movie.textColor }}>SYNOPSIS</h3>
                      <p className='snText' style={{ color: movie.textColor }}>{movie.synopsis}</p>
                    </div>
                  </Col>
                  <Col xs={12} lg={3} className='p-0 m-0'>
                    <div className='miContiner my-4'>
                      <img src={movie.bannerImage} className='miImage' alt={`${movie.movieName} Movie Background`}/>
                    </div>
                  </Col>
                </Row>
              </MotionCol>
              )}
            </InView>
            <InView threshold={0.5} triggerOnce={true}>
             {({ ref, inView }) =>(
              <MotionCol variants={buttonVariants} 
                ref={ref}  
                initial='hidden' 
                animate={inView ? 'visible' : 'hidden'} 
                  xs={12} >
                    <Row className='justify-content-center align-items-center'>
                      {movie.platforms.map((platform, idx) => (
                        <Col xs={6} lg={4} className='d-flex justify-content-center align-items-center mb-2' key={platform.name}>
                          <a key={idx} target='_blank' href={platform.link}>
                          <Image fluid src={platform.img} alt={platform.name}/>
                          </a>
                        </Col>
                      ))}
                    </Row>
              </MotionCol>
              )}
            </InView>
            </Row>
          </Container>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MusicInfoBanner;
