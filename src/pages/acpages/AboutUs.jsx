import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import HeaderCard from '../../components/HeaderCard'
import '../../assets/styles/aboutusstyles.css'

const AboutUs = () => {
  const aboutSections = [
    {
      title: 'Who We Are: The Birth of Hiphop Tamizha',
      description: `Hiphop Tamizha Aadhi is the co-founder of the renowned Tamil music duo, Hiphop Tamizha. Known for pioneering the Tamil hip-hop movement, Aadhi’s creative journey began with the viral single "Club Le Mabbu Le," which brought the duo into the spotlight. Their debut album, Hiphop Tamizhan (2012), was the first Tamil hip-hop album in India, cementing their place in the industry.`
    },
    {
      title: 'Our Musical Journey: Fusion of Tradition and Innovation',
      description: `Aadhi's work is characterized by a unique blend of traditional Tamil music and contemporary hip-hop, which has earned widespread acclaim. His fusion of the old and the new has not only created a new genre but has also made Tamil hip-hop a global phenomenon. Each track from Hiphop Tamizha resonates with the culture and essence of Tamil Nadu while embracing modern music trends.`
    },
    {
      title: 'From Music to Movies: Aadhi\'s Versatility',
      description: `In addition to music, Aadhi has seamlessly transitioned into film scoring and acting. His debut film, Meesaya Murukku, was a massive hit and showcased his multifaceted talents, from composing chart-topping soundtracks to delivering a compelling performance as an actor. Aadhi’s venture into cinema only broadened his influence in the entertainment industry.`
    },
    {
      title: 'Our Vision: Preserving and Promoting Tamil Culture',
      description: `At the heart of Aadhi's work is his dedication to preserving Tamil culture. Whether through his music, his lyrics, or his films, Aadhi consistently strives to bring Tamil traditions and stories to the forefront of popular culture. His creative vision continues to inspire millions of fans, fostering a sense of pride in Tamil heritage while modernizing its reach.`
    },
    {
      title: 'Inspiring Millions: The Legacy of Hiphop Tamizha',
      description: `Hiphop Tamizha has not only reshaped the Indian music scene but has also become a cultural movement. Aadhi’s journey from viral sensation to industry leader serves as an inspiration to countless aspiring artists. His commitment to innovation, creativity, and cultural preservation ensures that Hiphop Tamizha remains a driving force in Indian entertainment for years to come.`
    },
  ];
  return (
    <Container fluid className='aboutContainer'>
    <HeaderCard backgroundColor={"#3EA66B"} color={"#F4E003"} name="About Us" /> 
    <Row className='p-3'>
       {aboutSections.map((about, index)=>(
          <Col xs={12} className='my-2' key={index}>
            <h3 className='termTitleText'>{about.title}</h3>
            <p className='ps-4 termDescText'>{about.description}</p>
          </Col>
       ))}
       
        </Row>     
 </Container>
  )
}

export default AboutUs