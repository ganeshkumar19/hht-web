import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../assets/styles/logoutmodalstyles.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserDetails } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';


const LogoutModal = ({ showModal, handleClose }) => {
    const { setIsAuthenticated } = useAuth(); 
    const navigate = useNavigate();
    const { setUserDetails } = useUserDetails();

    const handleLogout = () => {
        // Remove tokens and user data from local storage
        localStorage.removeItem('id_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userId');
        sessionStorage.removeItem('firstTimeLogin');
        setIsAuthenticated(false)
        setUserDetails(null)

        // Close the modal
        navigate('/');

        // Show toast message after navigation
        toast.success('Logged Out Successfully', { autoClose: 2000 });
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered className='logoutModal'>
            <Modal.Body className='modalLogoutBody'>
                <h4>Oh, Leaving So Soon? 😢</h4>
                <p>Don't worry, your stars will be right here waiting when you come back!</p>
            </Modal.Body>
            <Modal.Footer className='modallogoutfooter'>
                <button onClick={handleLogout} className='logoutButton cancelButton'>
                    Logout
                </button>
                <button onClick={handleClose} className='logoutButton'>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default LogoutModal;