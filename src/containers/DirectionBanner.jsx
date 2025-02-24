import React, { useRef, useState } from 'react';
import HHT from "../assets/images/hht1.jpg";
import YoutubeIcon from "../assets/images/youtube.png";
import SpotifyIcon from "../assets/images/spotify.png";
import AmazonMusicIcon from "../assets/images/a.png";
import AudioIcon from "../assets/images/music.png";
import SunNxtIcon from "../assets/images/sunnxt.png";
import HotstarIcon from '../assets/images/hotstar.png'
import PrimeIcon from '../assets/images/prime.png'
import KUP from '../assets/images/kupdir.png'
import HHT2 from "../assets/images/hht2.jpg";
import HHT3 from "../assets/images/hht3.jpg";
import SS from '../assets/images/ss.png'
import '../assets/styles/directionBannerstyles.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer';
import { EffectCube, Pagination} from 'swiper/modules';
import { Col, Container, Image, Row } from "react-bootstrap";

const movies = [
    {
      title: "Meesaya Murukku",
      description: "Adhi, an aspiring musician, falls in love with Nila, a young woman in his college. Soon, he finds himself surrounded by several challenges as he tries to pursue his dreams.",
      swiperImages: [
        { src: HHT, alt: "movie-image" },
        { src: HHT2, alt: "movie-image" },
        { src: HHT3, alt: "movie-image" },
      ],
      platforms: [
        { name: "SunNxt", icon: SunNxtIcon, link: "https://www.sunnxt.com/movie/detail/72187/meesaya-murukku" }
      ],
      socialMedia: [
        { name: "Spotify", icon: SpotifyIcon, link: "https://open.spotify.com/album/6huPBShibyH3IJg5pPv8Bl" },
        { name: "Amazon Music", icon: AmazonMusicIcon, link: "https://music.amazon.in/albums/B074JD7RMS" },
        { name: "YouTube", icon: YoutubeIcon, link: "https://www.youtube.com/playlist?list=OLAK5uy_l1PpqASFjMPPMPq-5Wdenf9YCjiA52kto" },
      ],
    },
    {
        title: "Sivakumarin Sabadham",
        description: "A young man from a weaving family vows to restore it to its past glory by taking on a textile magnate.",
        swiperImages: [
          { src: SS, alt: "movie-image" }
        ],
        platforms: [
          { name: "Disney+Hotstar", icon: HotstarIcon, link: "https://www.hotstar.com/in/movies/sivakumarin-sabadham/1260074807?dclid=" }
        ],
        socialMedia: [
          { name: "Spotify", icon: SpotifyIcon, link: "https://open.spotify.com/album/3FhpEFtOnRT3hFkduW1hoz" },
          { name: "YouTube", icon: YoutubeIcon, link: "https://www.youtube.com/playlist?app=desktop&list=OLAK5uy_nptQremnzB-1Lge_aEhGUm0tHzX3BYUIQ" },
          { name: "Audio", icon: AudioIcon, link: "https://music.apple.com/in/album/sivakumarin-sabadham-original-motion-picture-soundtrack/1588125364" },   
        ],
    },
    {
      title: "Kadaisi Ulaga Por",
      description: "kadaisi ulaga por is a tamil dystopian science fiction action thriller directed by hiphop tamizha aadhi, featuring an ensemble cast including nassar and natarajan subramaniam",
      swiperImages: [
        { src: KUP, alt: "movie-image" },
      ],
      platforms: [
        { name: "Prime", icon: PrimeIcon, link: "https://www.primevideo.com/detail/0G6L4B9J8GMN0QRNLA7U1T3SVV/ref=atv_dp_share_mv" }
      ],
      socialMedia: [
        { name: "Spotify", icon: SpotifyIcon, link: "https://open.spotify.com/album/4WtnnFU79T9DmcGETED4v5" },
        { name: "Amazon Music", icon: AmazonMusicIcon, link: "https://www.amazon.com/Kadaisi-Original-Motion-Picture-Soundtrack/dp/B0DHHJNJ" },
      ],
    },
      
  ];

  const Direct = () => {
    const MotionRow = motion(Row);

    const rowVariants = {
      hidden: {
        opacity: 0,
        y: 85
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.1,
          duration: 0.5,
        }
      }
    }

    return (
      <Container fluid className="directionContainer">
        <div className="list-head text-center pt-4"><h2 className='pb-4'>Directed by HIPHOP TAMIZHA</h2></div>
        {movies.map((movie, index) => (
          <InView threshold={0.2} key={index} triggerOnce={true}>
             {({ ref, inView }) => (
          <MotionRow key={index}  
              ref={ref}  
              variants={rowVariants} 
              initial='hidden' 
              animate={inView ? 'visible' : 'hidden'} 
              className={`movies-row ${index % 2 !== 0 ? 'flex-md-row-reverse' : ''} pb-3`}>
            <Col md={6} lg={6} className='align-self-center'>
              <Swiper
                effect='cube'
                grabCursor={true}
                cubeEffect={{ shadow: true, slideShadows: true, shadowOffset: 20, shadowScale: 0.94 }}
                pagination={true}
                modules={[EffectCube, Pagination]}
                className="slideSwiper"
              >
                {movie.swiperImages.map((img, idx) => (
                  <SwiperSlide key={idx} className='movieslider'>
                    <Image src={img.src} alt={img.alt} className="swiperImage"/>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Col>
  
            <Col md={6} lg={6}>
              <div className="hht-details my-5 px-3">
                <h5>{movie.title}</h5>
                <p>{movie.description}</p>
              </div>
              {movie.platforms.map((platform, idx) => (
                <div className="hht-online px-4 py-2 flex-xs-column" key={idx}>
                  <a href={platform.link} target='_blank'><Image fluid src={platform.icon} alt={platform.name} className='pltImage' loading='lazy'/></a>
                  <p>WATCH THE MOVIE ON {platform.name.toUpperCase()}</p>
                </div>
              ))}
              <div className="social px-4 py-2">
                <p>LISTEN TO THE ALBUM ON</p>
                <div className="social-flex-two d-flex justify-content-center align-items-center gap-2 mt-4 mb-3">
                  {movie.socialMedia.map((media, idx) => (
                    <a href={media.link} key={idx} target='_blank' className='text-center'><Image src={media.icon} alt={media.name} className='mediaImage' loading='lazy'/></a>
                  ))}
                </div>
              </div>
            </Col>
          </MotionRow>
           )}
          </InView>
        ))}
      </Container>
    );
  };
  
export default React.memo(Direct);
  
  
  
  
  
  
  
  
  
  
