import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import '../assets/styles/storeitemsstyles.css'
import Background1 from '../assets/images/circle.mp4'
import Background2 from '../assets/images/cinema.mp4'
import Background3 from '../assets/images/trackmusic.mp4'
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer';


const StoreItems = () => {
  const MotionCol = motion(Col);
  const MotionRow = motion(Row)

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 100
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
      }
    }
  }

  const imageVariants ={
    hidden: {
      opacity: 0,
      x: 100
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.8,
        duration: 0.3,
      }
    }
  }

  const storeDetails = [
    { image: Background1, heading: 'MVMT', desc: "We've invited experts from beyond the art community, to discuss climate change, inequality, and the role artists can play.", isVideo: true },
    { image: Background2, heading: 'MOVIES', desc: "Meet fellow artists from the region, share best practices, and find opportunities to collaborate and create together.", isVideo: true },
    { image: Background3, heading: 'MUSIC', desc: "Stay for the whole event for a chance to win a variety of exciting prizes, including grants sponsorships, and more!", isVideo: true },
  ];
  return (
    <Container fluid className='storeContainer mx-auto'>
      <InView threshold={0.2} triggerOnce={true}>
        {({ ref, inView }) => (
        <MotionRow  
        variants={headerVariants} 
        ref={ref}  
        initial='hidden' 
        animate={inView ? 'visible': 'hidden'}  >
            <MotionCol xs={12} className='p-3 storeColoumn'>
               <p className='text-center mx-2 storeText'>What's in store for you</p>
            </MotionCol>   
        </MotionRow>
        )}
        </InView>
        <Row>
        {storeDetails.map((store, index) => (
          <InView threshold={0.2} triggerOnce={true} key={index}>
            {({ ref, inView }) => (
              <MotionCol
                md={4}
                variants={imageVariants}
                ref={ref}
                initial='hidden'
                animate={inView ? 'visible' : 'hidden'}
                className='text-center m-0 p-0'
                key={index}
              >
                <div className='imageContainer'>
                  {/* Conditionally render video or image */}
                  {store.isVideo ? (
                    <video
                      src={store.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="storeImage"
                    />
                  ) : (
                    <Image src={store.image} alt={store.heading} className="storeImage" />
                  )}
                  <h3 className='mx-1 my-1 headingText'>{store.heading}</h3>
                  <p className='mx-1 my-3 descStoreText'>{store.desc}</p>
                </div>
              </MotionCol>
            )}
          </InView>
        ))}
      </Row>
    </Container>
  )
}

export default React.memo(StoreItems)