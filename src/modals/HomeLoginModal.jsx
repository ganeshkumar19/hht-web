import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import '../assets/styles/loginmodalstyles.css'
import { useLogin } from '../contexts/LoginContext';
import {Link, useNavigate} from 'react-router-dom';
import DR from '../assets/images/dragon.png'
import ST from '../assets/images/star.png'


const HomeLoginModal = ({show, onHide}) => {
    const navigate = useNavigate(); 

    const handleLoginRedirect = () => {
        navigate('/login'); 
    };


    return (
        <Modal show={show} onHide={onHide} centered className='loginModal'>
            <Modal.Body className='modalLoginBody'>
                <h4>Login</h4>
            </Modal.Body>
            <Modal.Footer className='modalloginfooter'>
                <button className='loginButton' onClick={handleLoginRedirect}>
                    Login
                </button>
                <button onClick={onHide} className='loginButton cancelloginButton'>
                    Cancel
                </button>
            </Modal.Footer>
            <div className='dragonLoginContainer'>
                <Image fluid src={DR} alt='dr' className='drlogincontainerImage'/>
            </div>
            <div className='strLoginContainer'>
                <Image fluid src={ST} alt='dr' className='strlogincontainerImage'/>
            </div>
        </Modal>
    );
}

export default HomeLoginModal;