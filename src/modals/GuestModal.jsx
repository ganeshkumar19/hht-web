import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import '../assets/styles/guestmodalstyles.css'
import { useLogin } from '../contexts/LoginContext';
import {Link, useNavigate} from 'react-router-dom';
import DR from '../assets/images/dragon.png'
import ST from '../assets/images/star.png'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from '../contexts/CartContext';
import { useUserDetails } from '../contexts/UserContext';


const GuestModal = ({ onAccessTokenUpdate }) => {
    const { showGuestModal, toggleGuestModal  } = useLogin();
    const { fetchUserData } = useUserDetails();
    const { setNewAccessToken } = useCart();
    const navigate = useNavigate(); 

    const handleLoginRedirect = () => {
        toggleGuestModal(); 
        navigate('/login'); 
    };


    const handleGuestLogin = async () => {
        try {
            // Make the guest login API call
            const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/identity/users/guest/login`);
        
            // Extracting necessary data from the response
            const guestAccessToken = response.data.data.token.access_token;
            const guestRefreshToken = response.data.data.token.refresh_token;
            const guestIdToken = response.data.data.token.id_token;
            const guestUserId = response.data.data.user.id;
            const guestUserDetails = response.data.data.user;
    
            // Storing the tokens and user details WITHOUT the "guest_" prefix in localStorage
            localStorage.setItem('id_token', guestIdToken);
            localStorage.setItem('access_token', guestAccessToken);
            localStorage.setItem('userId', guestUserId);
            localStorage.setItem('userDetails', JSON.stringify(guestUserDetails));
    
            setNewAccessToken(guestAccessToken);

            await fetchUserData(guestUserId);

            onAccessTokenUpdate(guestAccessToken);
    
            // Close the guest modal
            toggleGuestModal();
          
            toast.success('Logged in as Guest User');
        } catch (error) {
            console.error('Error logging in as guest:', error);
            toast.error('Failed to log in as guest.');
        }
    };
    


    return (
        <Modal show={showGuestModal} onHide={toggleGuestModal} centered className='guestModal'>
            <Modal.Body className='guestLoginBody'>
                <h4>Login</h4>
                <p>Please Login to Access this page</p>
            </Modal.Body>
            <Modal.Footer className='guestloginfooter'>
                <button className='guestloginButton' onClick={handleLoginRedirect}>
                    Login
                </button>
                <button onClick={handleGuestLogin} className='guestloginButton cancelguestButton'>
                    Login As Guest
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

export default GuestModal;