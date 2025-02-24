import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import HHT from '../assets/images/hhtlogo.png';
import FB from '../assets/images/facebook.png';
import YT from '../assets/images/youtubeblacl.png';
import IN from '../assets/images/instagram.png';
import '../assets/styles/footerstyles.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const iconLinks = [
  { src: IN, alt: "Instagram", link: 'https://www.instagram.com/hiphoptamizha' },
  { src: FB, alt: "FaceBook", link: 'https://www.facebook.com/hiphoptamizha' },
  { src: YT, alt: "Youtube", link: 'https://www.youtube.com/user/hiphoptamizha' },
  ];

  const policyLinks = [
    { policy: "Terms and conditions", link: '/T&C' },
    { policy: "Privacy Policy", link: '/privacypolicy' },
    { policy: "Return Policy", link: '/returnpolicy' },
  ]
  return (
    <Container fluid className='footerContainer'>
      <Row className='d-flex align-items-center justify-content-center justify-content-md-between'>
        <Col md={6} className='d-flex align-items-center justify-content-center justify-content-md-start'>
          <Image fluid src={HHT} alt="HHT" className='httlogoimage' />
        </Col>
        <Col md={6} className='d-flex align-items-center justify-content-center justify-content-md-end'>
        {iconLinks.map((icon, index) => (
                <a
                href={icon.link}
                target="_blank"
                key={index}
                className='text-center'
                >
          
          <Image src={icon.src} alt={icon.alt} className='footerIconImage' />
          </a>
        ))}
        </Col>
      </Row>
      <Row className='d-flex flex-column-reverse my-4 my-md-0 flex-md-row align-items-center justify-content-center justify-content-md-between my-3'>
        <Col md={6} className='d-flex align-items-center justify-content-center justify-content-md-start'>
          <p className='footerparatext'>@2024 hiphop tamizha</p>
        </Col>
        <Col md={6} className='d-flex align-items-center justify-content-center align-self-center justify-content-md-end gap-2'>
          {policyLinks.map((link, index)=>(
            <div key={index} className='d-flex flex-column flex-md-row'>
            <Link to={link.link} style={{textDecoration: "none", color: 'white'}}>
              <p className='footerparatext text-center text-md-left'>{link.policy}</p>
            </Link>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;