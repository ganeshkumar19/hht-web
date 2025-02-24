import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BsArrowRight } from 'react-icons/bs';
import '../../assets/styles/careerstyles.css'
import { useNavigate } from 'react-router-dom'; 
import {motion} from 'framer-motion'
import HeaderCard from '../../components/HeaderCard';

const Career = () => {
  const navigate = useNavigate();

  const JobTypes = [
    {id: 1 , type: "Full-time employment"},
    {id: 2, type: "Part-time employment"},
    {id: 3, type: "Freelance"}
  ]

  const handleNavigate = (employmentType) => {
    navigate('/careerforms', { state: { employmentType } });
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: -85
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        duration: 0.8,
      }
    }
  }

  return (
    <Container fluid className='careerContainer'>
    <HeaderCard backgroundColor={"#3EA66B"} color={"#F4E003"} name="Careers"/>
    <Container className='innerCareerConatiner'>
      <Row>
        <Col xs={12} className='cphConatiner'>
         <motion.p className='my-4 p-0 careerParagraph' initial='hidden' animate='visible' variants={containerVariants}>
         Hip Hop Tamizha has had quite the ride in music and movies, always finding new ways to shake things up. If you’re into creating cool stuff and want to join the crew, why not send over your portfolio? 
         Let’s make some magic together!
         </motion.p>
        </Col>
        <Col xs={12} className="d-flex flex-column justify-content-center align-items-center w-100 my-3">
          {JobTypes.map((type)=>(
            <div key={type.id} className="ccContainer" onClick={() => handleNavigate(type.type)}>
            <span className="ccContainerText">{type.type}</span>
            <BsArrowRight className="ccContainerIcon" />
          </div>
          ))}
        </Col>
      </Row>
    </Container>
  </Container>
  )
}

export default Career