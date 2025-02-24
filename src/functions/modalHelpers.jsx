import React from 'react';
import { Modal, Image } from 'react-bootstrap';
import DR from '../assets/images/dragon.png';
import ST from '../assets/images/star.png';

// Helper function to render footer buttons
export const renderFooterButtons = (handleLoginRedirect, toggleLoginModal) => (
    <Modal.Footer className='modalloginfooter'>
        <button className='loginButton' onClick={handleLoginRedirect}>
            Login
        </button>
        <button onClick={toggleLoginModal} className='loginButton cancelloginButton'>
            Cancel
        </button>
    </Modal.Footer>
);

// Helper function to render floating images
export const renderFloatingImages = () => (
    <>
        <div className='dragonLoginContainer'>
            <Image fluid src={DR} alt='dragon' className='drlogincontainerImage' />
        </div>
        <div className='strLoginContainer'>
            <Image fluid src={ST} alt='star' className='strlogincontainerImage' />
        </div>
    </>
);