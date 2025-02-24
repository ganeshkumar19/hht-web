import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner, Image } from 'react-bootstrap';
import EventCard from '../components/EventCard';
import HeaderCard from '../components/HeaderCard';
import '../assets/styles/eventstyles.css';
import PaginationComponent from '../components/PaginationComponent';
import CSM from '../assets/images/csm.png'
import {motion} from 'framer-motion'
import LoaderComponent from '../components/LoaderComponent';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Keep currentPage as zero-based for API compatibility
  const [totalPages, setTotalPages] = useState(0);

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

  const fetchEvents = async (page = 0) => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_BASE_API_URL}/events/latest/4/${page}`;
  
      const response = await axios.get(url);
  
      if (response.data.status === "success") {
        setEvents(response.data.data.map(event => ({
          id: event.ID,
          title: event.name,
          venue: event.venue,
          date: new Date(event.date_of_occurence).toLocaleDateString(),
          image: event.image_url,
          link: event.booking_url
        })));
        setTotalPages(response.data.pagination.total);
      } else {
        throw new Error('Failed to fetch events from API');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.message || 'An error occurred while fetching events.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  if (loading) {
    return <LoaderComponent/>
  }

  if (error) {
    return (
      <Container fluid className='eventsContainer'>
        <HeaderCard backgroundColor={"#3EA66B"} color={"#F4E003"} name="Events"/>
        <Row className='mt-3'>
          <Col><p>{error}</p></Col>
        </Row>
      </Container>
    );
  }



  // Display a message if there are no events after loading is complete
  return (
    <Container fluid className='eventsContainer'>
      <HeaderCard backgroundColor={"#3EA66B"} color={"#F4E003"} name="Events"/>
      <Row className='mt-3'>
        {events.length > 0 ? (
          events.map(event => (
            <Col xs={12} key={event.id}>
              <EventCard event={event}/>
            </Col>
          ))
        ) : (
          <motion.div variants={textVariants} initial='hidden' animate='visible' className='cmSoonContainer d-flex justify-content-center align-items-start my-3'>
              <Image fluid src={CSM} className='csmImage'/>
          </motion.div>
        )}
      </Row>
      <PaginationComponent 
          currentPage={currentPage + 1} // Adjust for 1-based index in the component
          totalPages={totalPages} 
          onPageChange={setCurrentPage}
      />
    </Container>
  );
}

export default Events;
