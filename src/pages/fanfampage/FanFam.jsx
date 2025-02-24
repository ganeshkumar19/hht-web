import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner, Image } from 'react-bootstrap';
import '../../assets/styles/ffcontainerstyles.css'
import FanFamSlider from '../../components/FanFamSlider';
import PP from '../../assets/images/ppimage.png'
import POST1 from '../../assets/images/post1.png'
import POST2 from '../../assets/images/post2.png'
import FanFamPostCard from '../../components/FanFamPostCard';
import HeaderCard from '../../components/HeaderCard';
import {motion} from 'framer-motion'
import CSM from '../../assets/images/csm.png'

const FanFam = () => {
  const [fanFamUpdateDetails, setFanFamUpdateDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const loader = useRef(null);

  const textVariants = {
    hidden: {
        opacity: 0,
        y: -100
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 110,
            damping: 4,
            delay: 0.3,
            duration: 1.5,
        }
    }
};


  useEffect(() => {
    if(currentPage > totalPages){
        return;
    }
    const fetchUpdates = async () => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/fanfam/officialupdate/latest/2/${currentPage}?sort=desc`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (response.data.status === "success") {
                setFanFamUpdateDetails(prevUpdates => [...prevUpdates, ...response.data.data.map(update => ({
                    id: update.ID,
                    src: update.image_url,
                    title: update.media_title,
                    info: update.media_text,
                    link: update.media_link,
                }))]);
                setTotalPages(Math.ceil(response.data.pagination.total / response.data.pagination.limit));
                setCurrentPage(prevPage => prevPage + 1); 
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchUpdates();
}, [currentPage]);


useEffect(() => {
    const observer = new IntersectionObserver(entries => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && currentPage < totalPages && !loading) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    }, { threshold: 0.5 });
  
    const currentElement = loader.current;
    if (currentElement) {
        observer.observe(currentElement);
    }
  
    return () => {
        if (currentElement) {
            observer.unobserve(currentElement);
        }
    };
  }, [currentPage, totalPages, loading]);


    const postDetails = [
      { id: 1, src: POST1, prImage: PP,  prName: 'Shynu mash', prLocation: 'Coimbatore, TamilNadu' , desc: 'World’s best Rap song ever made by Aadhi Anna.. Thanks to Aadhi na', span: '#aadhina_mass'  },
      { id: 2, src: POST2, prImage: PP, prName: 'Shynu mash', prLocation: 'Coimbatore, TamilNadu', desc: 'Tamizhi', span: '#Support_true_talents'},
  ];

  return (
    <Container fluid className='ffContainer'>
      <HeaderCard backgroundColor={"#57A5BB"} color={"#F4E003"} name="FanFam"/>
      <Row className='my-4'>
        <Col sm={6} md={4} className=''> 
          <div className='ouContainer'>
          <h5 className='mt-2 ouText'>Official Updates</h5>
          </div>
          <div className='d-flex justify-content-center align-items-center my-3'>
                        {loading && fanFamUpdateDetails.length === 0 ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : fanFamUpdateDetails.length > 0 ? (
                            <FanFamSlider images={fanFamUpdateDetails} />
                        ) : (
                            <p>No new updates available.</p>
                        )}
                        <div ref={loader} />
                    </div>
        </Col>
        <Col sm={6} md={8}>  {/* Adjusted for a larger width */}
          <div className='ffuContainer mb-4'>
          <h5 className='mt-2 ffuText'>FanFam Updates</h5>
          </div>
          <motion.div variants={textVariants} initial='hidden' whileInView='visible' className='cmSoonContainer d-flex justify-content-center align-items-center my-3'>
           <Image fluid src={CSM} className='csmImage'/>
        </motion.div>
          {/*<div className='d-flex flex-column align-items-center justify-content-center mx-2'>
          {postDetails.map(post => (
            <FanFamPostCard key={post.id} post={post} />
          ))}
          </div>*/}
        </Col>
      </Row>
    </Container>
  )
}

export default FanFam