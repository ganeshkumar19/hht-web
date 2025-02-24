import React from 'react';
import { Image, Modal } from 'react-bootstrap';
import '../assets/styles/ticketmodalstyles.css';
import eventPoster from '../assets/images/worldtour.png';
import DR from '../assets/images/dragon.png'
import ST from '../assets/images/star.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogin } from '../contexts/LoginContext';
import LoginModal from './LoginModal';

const TicketBookingModal = ({ show, onHide }) => {
    const navigate = useNavigate();
    const { toggleLoginModal } = useLogin();

    const handleBookingClick = () => {
            navigate('/events'); 
    };

    return (
        <>
        <LoginModal/>
        <Modal show={show} onHide={onHide} centered className='modalContainer' size="lg">
            <Modal.Header closeButton></Modal.Header>
            <div className="ticketbookingcontainer d-flex flex-column flex-lg-row justify-content-center align-items-start p-4">
                <div className='posterImageContainer'>
                    <img src={eventPoster} alt="Event Poster" className='posterImage' />
                </div>
                <div className='mt-1 ticketsTextContainer'>
                    <h4 className='msText'>Don't Miss Out!</h4>
                    <p className='msPopText'>Secure your spot now for an unforgettable experience.</p>
                        <button className='popButton mt-3' onClick={handleBookingClick}>Book Tickets</button>
                </div>
            </div>
            <div className='dragonContainer'>
                <Image fluid src={DR} alt='dr' className='drcontainerImage'/>
            </div>
            <div className='strContainer'>
                <Image fluid src={ST} alt='dr' className='strcontainerImage'/>
            </div>
            <Modal.Footer></Modal.Footer>
        </Modal>
        </>
    );
};

export default TicketBookingModal;

