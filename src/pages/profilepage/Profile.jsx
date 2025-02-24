import React, { useEffect, useRef, useState } from 'react'
import '../../assets/styles/profilestyles.css'
import { Container, Row, Col, Image } from 'react-bootstrap'
import RPERSON from '../../assets/images/rperson.png'
import { FaPencilAlt } from 'react-icons/fa';
import { BsPencilSquare } from "react-icons/bs";
import { BsArrowRight } from 'react-icons/bs';
import { LuCrown } from "react-icons/lu";
import FaqContainerComponent from '../../components/FaqContainer';
import TicketCard from '../../components/TicketCard';
import LogoutModal from '../../modals/LogoutModal';
import HeaderCard from '../../components/HeaderCard';
import { useUserDetails } from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { updateUserProfile } from '../../apifunctions/updateUserProfile';
import { FaDownload } from "react-icons/fa";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogOutModal] = useState(false);
  const { userDetails, updateUserDetails} = useUserDetails();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDownloadClick = (e) => {
    e.preventDefault(); 
    
    if (!userDetails?.fam_card_url) {
      toast.error("Your Fanfam Card Download Feature is not available yet. Kindly check back in a few days!");
      return; 
    }
    const link = document.createElement('a');
    link.href = userDetails?.fam_card_url;
    link.target = '_blank'; // Open in a new tab
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleNavigate = () => {
    navigate('/profile/address');
  };


  const getContactDetail = (type) => {
    const contact = userDetails?.contacts?.find(contact => contact.contact_type === type);
    return contact ? contact.contact : 'Not provided';
  };


  const handleIconClick = () => {
    fileInputRef.current.click(); // Triggers the file input
  };
  

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
        // Use FileReader to preview the image locally
        const reader = new FileReader();
        reader.onloadend = async () => {
            try {
                // Display the local image preview
                updateUserDetails({ image_url: reader.result });

                // Prepare to upload
                const formData = new FormData();
                formData.append('file', file);

                // Upload the image to the server
                const uploadResponse = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/identity/users/Upload`, formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
                // Check if the server responded with the new image URL and update profile
                if (uploadResponse.data && uploadResponse.data.data) {
                    toast.success('Image uploaded successfully!');
                    updateUserProfile(uploadResponse.data.data, userDetails); // Use the server's returned image URL
                }
            } catch (error) {
                toast.error('Failed to upload image. Please try again.');
            }
        };
        reader.onerror = () => {
            toast.error("Failed to read the file.");
        };
        reader.readAsDataURL(file);
    } else {
        toast.error("Please upload an image in PNG or JPEG format.");
    }
};

  


    const toggleShowLogoutModal = () => {
      setShowLogOutModal(!showLogoutModal);
    }

  const toggleModal = ()=>{
    setShowModal(true);
  }
    const faqs = [
      { question: "How do I access the events page to view and book upcoming events?", answer: 'To access our upcoming events, please ensure you are logged in to your account. Once logged in, click on the "Events" tab from the home page. You will be directed to a detailed list of upcoming events where you can book and attend your favorite ones. This section is exclusively available to registered users, ensuring a personalized experience.' },
        { question: "How do I update my profile Image?", answer: "You can update your profile image by clicking on the edit icon next which is on the top of your Profile Image. Make the necessary changes and ensure you save them before exiting." },
        { question: "When will the merchandise page be available?", answer: "We are currently updating our merchandise offerings to provide you with the best products. The page will be available soon, and we appreciate your patience. Stay tuned for updates!" },
        
      ];
  return (
   <Container fluid className='profilePageContainer'>
       <HeaderCard backgroundColor={"#3EA66B"} color={"#F4E003"} name="Profile"/>
      <Row>
        <Col xs={12} className='mt-2 d-flex justify-content-end align-items-center'>
         <button className='logoutButton d-flex justify-content-center align-items-center' onClick={toggleShowLogoutModal}>Logout</button>
        </Col>
      </Row>
      <Container>
      <Row className="justify-content-center">
        <Col md={6} className='mt-4 ppImageCol'>
        <div className='ppImageContainer my-2'>
        <LazyLoadImage
            src={userDetails?.image_url || RPERSON}
            alt='person'
            placeholderSrc={RPERSON}
            effect="blur"
            className={userDetails?.image_url ? 'apiImage' : 'rpersonImage'}
            width="100%" 
            height="100%" 
            style={{ objectFit: 'cover', borderRadius: '5px' }} // Ensuring proper scaling
          />
              <FaPencilAlt className="editPictureIcon" onClick={handleIconClick} />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/png, image/jpeg"
                onChange={handleImageUpload}
              />
            </div>
        </Col>
        <Col md={6} className='mt-4'>
          <div className='prfContainer'>
            <p className='prfName m-0 p-0'>{userDetails?.display_name}</p>
            <p className='prfRole m-0 p-0'>{userDetails?.roles[0].user_role}  <LuCrown style={{width: '20px', color: 'gold'}}/></p>
          </div>
          <div className='infoItemContainer d-flex flex-column align-items-center justify-content-center my-4'>
          <div className='infoItem'>
                  <p className='infoTitle'>Mobile Number</p>
                  <p className='infoNumber'>{getContactDetail('phone')}</p>
                </div>
                <div className='infoItem'>
                  <p className='infoTitle'>Email</p>
                  <p className='infoNumber'>{getContactDetail('email')}</p>
                </div>
            <div className='infoItem'>
              <p className='infoTitle'>Zone</p>
              <p className='infoNumber'>{userDetails?.zone}</p>
            </div>
            {/*<div className='infoItem'>
              <p className='infoTitle'>Address</p>
              <p className='infoNumber'>Coimbatore, Tamil Nadu</p>
            </div>*/}
          </div>
          <div className='ffBContainer my-4'>
            <button className='ffbutton d-flex justify-content-center align-items-center' onClick={toggleModal}>Fanfam Card</button>
            {/*<button className='ffDownloadContainer'>
            <a onClick={handleDownloadClick}><FaDownload color='white'/></a>
            </button>*/}
            </div>
        </Col>
    </Row>
    <Row className="justify-content-center my-3">
        <Col xs={12} className="d-flex justify-content-center">
          <div className="addressBox" onClick={handleNavigate}>
            <span className="addressText">Addresses</span>
            <BsArrowRight className="addressIcon" />
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center my-3">
        <Col xs={12} className="d-flex justify-content-center">
        <FaqContainerComponent faqs={faqs} />
        </Col>
      </Row>
    </Container>
    <TicketCard show={showModal} onHide={() => setShowModal(false)}/>
    <LogoutModal showModal={showLogoutModal} handleClose={toggleShowLogoutModal} />             
   </Container>
  )
}



export default Profile