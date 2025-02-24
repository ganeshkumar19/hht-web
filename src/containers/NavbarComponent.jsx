import React, { useState } from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import HHTLOGO from '../assets/images/hhtlogo.png'; // Ensure the path is correct
import { LinkContainer } from 'react-router-bootstrap';
import NAVPROFILE from '../assets/images/navProfile.png'
import '../assets/styles/navstyles.css'
import { useAuth } from '../contexts/AuthContext';
import { useLogin } from '../contexts/LoginContext';
import { useOrders } from '../contexts/OrderContext';

const NavbarComponent = () => {
  const { isAuthenticated } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const { toggleLoginModal } = useLogin();


  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  const handleAuthenticatedLinkClick = (event) => {
    if (!isAuthenticated) {
      event.preventDefault(); // Prevent the link from navigating
      toggleLoginModal(); // Call the function to show the login modal
    }
    handleClose();
  };

  const NavLinks = [
    {name: 'Home', link: '/', handlefunction: handleClose},
    {name: 'FanFam', link: '/fanfam', handlefunction: handleAuthenticatedLinkClick},
    {name: 'Events', link: '/events', handlefunction: handleClose},
    {name: 'Merchandise', link: '/merch', handlefunction: handleClose},
    {name: 'HHT hub', link: '/hhthub', handlefunction: handleAuthenticatedLinkClick},
    {name: 'About', link: '/about', handlefunction: handleClose },
    {name: 'Contact Us', link: '/contact', handlefunction: handleClose},
  ]

  return (
    <Navbar expand="md" variant="dark" fixed="top" expanded={expanded} style={{ backgroundColor: 'black' }}>
      <Container fluid>
      <LinkContainer to="/">
        <Navbar.Brand>
          <img
            src={HHTLOGO}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center"> {/* Changed from ml-auto to ms-auto for Bootstrap 5 or keep ml-auto if using Bootstrap 4 */}
          {NavLinks.map((nav, index)=>(
            <LinkContainer key={index} to={nav.link} onClick={nav.handlefunction}>
            <Nav.Link>{nav.name}</Nav.Link>
          </LinkContainer>
          ))}
          
          
      {/* <LinkContainer to="/career" onClick={handleAuthenticatedLinkClick}>
              <Nav.Link>Careers</Nav.Link>
        </LinkContainer>
       <LinkContainer to="/mvmt" onClick={handleAuthenticatedLinkClick}>
              <Nav.Link>MVMT</Nav.Link>
        </LinkContainer>*/}
            <LinkContainer to="/profile" onClick={handleAuthenticatedLinkClick}>
            <Nav.Link>
                <span className="nav-profile-text">Profile</span>
                <Image className="nav-profile-image" fluid src={NAVPROFILE} />
            </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
