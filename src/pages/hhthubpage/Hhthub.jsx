import React, { useState, useEffect } from 'react'
import { Col, Container, Image, Row , Spinner} from 'react-bootstrap';
import '../../assets/styles/hhthubstyles.css'
import ArticleCard from '../../components/ArticleCard';
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import HeaderCard from '../../components/HeaderCard';
import CSM from '../../assets/images/csm.png'
import axios from 'axios';


const Hhthub = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Keep currentPage as zero-based for API compatibility
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

    const handleBarsClick = () => {
        navigate(`/hhthub/bars`);
      };
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

      const fetchArticles = async (page = 0) => {
        setLoading(true);
        try {
          const accessToken = localStorage.getItem('access_token');
          if (!accessToken) {
            throw new Error('Authorization token not found.');
          }
      
          const url = `${import.meta.env.VITE_BASE_API_URL}/ugt/article/latest/3/${page}`;
      
          const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          });
      
          if (response.data.status === "success") {
            setArticles(prevArticles => [
              ...prevArticles,  // Spread the previous articles
              ...response.data.data.map(article => ({  // Map new articles and add them to the list
                id: article.ID,
                title: article.title,
                content: article.description,
              }))
            ]);
            setTotalPages(response.data.pagination.total);
          } else {
            throw new Error('Failed to fetch articles from API');
          }
        } catch (error) {
          console.error('Error fetching bars:', error);
          setError(error.message || 'An error occurred while fetching articles.');
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
      fetchArticles(currentPage);
    }, [currentPage]);

    const handleReachEnd = () => {
      if (currentPage < totalPages - 1) {
        setCurrentPage(prev => prev + 1);
      }
    };
  
    if (loading) {
      return (
        <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#57A5BB'}}>
          <Spinner animation="border" role="status" color='white'></Spinner>
        </div>
      );
    }

      return (
        <Container fluid className='hhthubContainer'>
          <HeaderCard backgroundColor={"#F5BE49"} color={"#57A5BB"} name={"HHT Hub"}/>
          <InView threshold={0.2} triggerOnce={true}>
           {({ ref, inView }) => (
          <MotionContainer fluid 
          ref={ref} 
          variants={containerVariants} 
          initial='hidden' 
          animate={inView ? 'visible' : 'hidden'}
          className='my-3 ms-1'>
            <Row>
            {!loading && articles.length > 0 ? (
                <Col xs={12}>
                  <p className='barText'>Article's</p>
                  <ArticleCard articles={articles} onReachEnd={handleReachEnd} />
                </Col>
              ) : (
              <motion.div variants={textVariants} initial='hidden' animate='visible' className='cmSoonContainer d-flex justify-content-center align-items-center my-3'>
                <Image fluid src={CSM} className='csmImage'/>
              </motion.div>
              )}
            </Row>
          
            </MotionContainer>
            )}
            </InView>
          <Container fluid className='hubContainer'>
                <Row className='d-flex justify-content-around align-items-start'> {/* Adjusted for top alignment */}
                    <Col xs={6} md={6} className='hubBtnContainer' onClick={handleBarsClick}>
                        <button className='hubBtn'>Bars</button>
                    </Col>
                    <Col xs={6} md={6} className='hubBtnContainer jamsBtnContainer'> {/* Special class for JAMS */}
                        <button className='hubBtn' disabled style={{ opacity: 0.5, cursor: 'initial' }}>JAMS</button>
                        <p className='csText'>(Coming Soon)</p>
                    </Col>
                </Row>
         </Container>
        </Container>
      );
}

export default Hhthub