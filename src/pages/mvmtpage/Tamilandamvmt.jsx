import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer';
import '../../assets/styles/mvmtstyles.css'
import {Container, Row, Col, Image} from 'react-bootstrap';
import MVMTCard from '../../components/MVMTCard';
import HeaderCard from '../../components/HeaderCard';
import CSM from '../../assets/images/csm.png'
import FAV from '../../assets/images/hhtlogo.png'
import PaginationComponent from '../../components/PaginationComponent';
import axios from 'axios';

const Tamilandamvmt = () => {
      const [mvmtDetails, setMvmtDetails] = useState([])
      const [error, setError] = useState(null)
      const [loading, setLoading] = useState(true)
      const [totalPages, setTotalPages] = useState(0)
      const [currentPage, setCurrentPage] = useState(0)

      const MotionContainer = motion(Container);
      const containerVariants = {
          hidden: {
            opacity: 0,
            x: -85
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              delay: 0.4,
              duration: 0.5,
            }
          }
        }

        const textVariants = {
          hidden: {
              opacity: 0,
              x: -100
          },
          visible: {
              opacity: 1,
              x: 0,
              transition: {
                  type: 'spring',
                  stiffness: 110,
                  damping: 4,
                  delay: 0.3,
                  duration: 1,
              }
          }
      };

      const imageVariants = {
        spin: {
          rotate: 360,  // Complete one full circle
          transition: {
            duration: 2,  // Duration for one complete rotation
            ease: "linear",  // Use a linear easing for consistent speed
            repeat: Infinity,  // Repeat indefinitely
            repeatType: "loop"
          }
        }
      };

        const fetchMvmt = async(page=0)=>{
          setLoading(true)
          try{
            const accessToken = localStorage.getItem('access_token')

            if(!accessToken){
              throw Error('Authorization token not found.')
            }
            const url = `${import.meta.env.VITE_BASE_API_URL}/tamizhamoments/latest/6/${page}`

            const response = await axios.get(url, {
              headers: {'Authorization': `Bearer ${accessToken}`}
            })

            if(response.data.status=== "success"){
              setMvmtDetails(response.data.data.map(mvmt=>({
                id: mvmt.ID,
                title: mvmt.media_title,
                episode: mvmt.media_text,
                image: mvmt.bg_image_url,
                link: mvmt.media_link
              })))
              setTotalPages(response.data.pagination.total);
            } else {
              throw new Error('Failed to fetch bars from API');
            }
          } catch (error) {
            setError(error.message || 'An error occurred while fetching events.');
          } finally {
            setLoading(false);
          }
      };

      useEffect(() => {
        fetchMvmt(currentPage);
      }, [currentPage]);
    
      if (loading) {
        return (
          <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#57A5BB'}}>
            <div className="pageloader">
            <motion.img 
              src={FAV} 
              alt="Loading..." 
              className="pageloader-image"
              variants={imageVariants}
              animate="spin"  // Use the breathe animation
            />
          </div>
          </div>
        );
      }
    return (
        <Container fluid className='mvmtContainer'>
        <HeaderCard backgroundColor={"#F5BE49"} color={"#57A5BB"} name={"TAMIZHANDA MVMT"}/>
        <MotionContainer fluid 
        className='my-3 ms-1'>

          <Row>
          {mvmtDetails.length > 0 ? (
            <Col xs={12}>
              <p className='barText'>MVMT</p>
              <MVMTCard mvmtDetails={mvmtDetails}/>
            </Col>
          ) : (
          <motion.div variants={textVariants} initial='hidden' animate='visible' className='cmSoonContainer d-flex justify-content-center align-items-center my-3'>
            <Image fluid src={CSM} className='csmImage'/>
           </motion.div>
          )}
        </Row>
          </MotionContainer>
           <PaginationComponent 
          currentPage={currentPage + 1}
          totalPages={totalPages} 
          onPageChange={setCurrentPage}
         />
      </Container>
      )
}

export default Tamilandamvmt