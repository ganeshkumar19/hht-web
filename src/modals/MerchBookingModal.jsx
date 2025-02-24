import React from 'react';
import { Image, Modal } from 'react-bootstrap';
import '../assets/styles/merchmodalstyles.css';
import eventPoster from '../assets/images/merchposter.png';
import DR from '../assets/images/dragon.png'
import ST from '../assets/images/star.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogin } from '../contexts/LoginContext';
import LoginModal from './LoginModal';

const MerchBookingModal = ({ show, onHide }) => {
    const navigate = useNavigate();

    const handleBookingClick = () => {
       
            navigate('/merch'); 
    
    };

    return (
        <>
        <LoginModal/>
        <Modal show={show} onHide={onHide} centered className='merchModalContainer' size="lg">
            <Modal.Header closeButton></Modal.Header>
            <div className="merchbuycontainer d-flex flex-column flex-lg-row justify-content-center align-items-start p-4">
                <div className='merchposterImageContainer'>
                    <img src={eventPoster} alt="Event Poster" className='merchposterImage' loading='lazy' />
                </div>
                <div className='mt-1 merchTextContainer'>
                    <h4 className='msmerchText'>Don't Miss Out!</h4>
                    <p className='msmerchPopText'>Explore exclusive merchandise from your favourite artist and keep the memories alive.</p>
                        <button className='popmerchButton mt-3' onClick={handleBookingClick}>Buy Now</button>
                </div>
            </div>
            <div className='dragonContainer'>
                <Image fluid src={DR} alt='dr' className='drcontainerImage' loading='lazy'/>
            </div>
            <div className='strContainer'>
                <Image fluid src={ST} alt='dr' className='strcontainerImage' loading='lazy'/>
            </div>
            <Modal.Footer></Modal.Footer>
        </Modal>
        </>
    );
};

export default MerchBookingModal;