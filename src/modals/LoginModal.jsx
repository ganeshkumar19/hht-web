import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import '../assets/styles/loginmodalstyles.css';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import { renderFloatingImages, renderFooterButtons } from '../functions/modalHelpers';

const LoginModal = () => {
    const { showLoginModal, toggleLoginModal, showAccessMessage } = useLogin();
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        toggleLoginModal();
        navigate('/login');
    };

  
    return (
        <Modal show={showLoginModal} onHide={toggleLoginModal} centered className='loginModal'>
            <Modal.Body className='modalLoginBody'>
                <h4>Login</h4>
                {showAccessMessage && <p>Please Login to Access this page</p>}
            </Modal.Body>
            {renderFooterButtons(handleLoginRedirect, toggleLoginModal)} {/* Pass necessary handlers */}
            {renderFloatingImages()} {/* Render images */}
        </Modal>
    );
};

export default LoginModal;

