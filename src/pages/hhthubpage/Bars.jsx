import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/styles/barsstyles.css'
import { Col, Container, Image, Row , Spinner} from 'react-bootstrap';
import BarCard from '../../components/BarCard';
import { motion } from "framer-motion";
import PaginationComponent from '../../components/PaginationComponent';
import CSM from '../../assets/images/csm.png'
import FAV from '../../assets/images/hhtlogo.png'
import HeaderCard from '../../components/HeaderCard';
import LoaderComponent from '../../components/LoaderComponent';



const Bars = () => {
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Keep currentPage as zero-based for API compatibility
  const [totalPages, setTotalPages] = useState(0);
    
    const MotionContainer = motion(Container);


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
      const fetchBars = async (page = 0) => {
        setLoading(true);
        try {
          const accessToken = localStorage.getItem('access_token');
          if (!accessToken) {
            throw new Error('Authorization token not found.');
          }
      
          const url = `${import.meta.env.VITE_BASE_API_URL}/ugt/bars/latest/6/${page}`;
      
          const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          });
      
          if (response.data.status === "success") {
            setBars(response.data.data.map(bar => ({
              id: bar.ID,
              title: bar.title,
              image: bar.bg_image_url,
              link: bar.media_url
            })));
            setTotalPages(response.data.pagination.total);
          } else {
            throw new Error('Failed to fetch bars from API');
          }
        } catch (error) {
          console.error('Error fetching bars:', error);
          setError(error.message || 'An error occurred while fetching events.');
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
      fetchBars(currentPage);
    }, [currentPage]);
  
    if (loading) {
      return <LoaderComponent />;

    }

  return (
    <Container fluid className='barsContainer'>
    <HeaderCard backgroundColor={"#F5BE49"} color={"#57A5BB"} name={"HHT Hub"}/>
    <MotionContainer fluid className='my-3 ms-1'>
        <Row>
          {bars.length > 0 ? (
            <Col xs={12}>
              <p className='barText'>Bars</p>
              <BarCard bars={bars} />
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

export default Bars