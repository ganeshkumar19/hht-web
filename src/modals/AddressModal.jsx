import React, { useState } from 'react';
import { Image, Modal} from 'react-bootstrap';
import homeIcon from '../assets/images/Home.png'; // Assuming you have this icon
import workIcon from '../assets/images/work.png'; // Work icon
import othersIcon from '../assets/images/others.png';
import '../assets/styles/addressmodalstyles.css' // Assuming you're using react-bootstrap
import { useNavigate } from 'react-router-dom';

const AddressChangeModal = ({ show, onHide, selectedId, addresses, handleAddressChange }) => {

  const navigate = useNavigate(); 

  

  const getAddressIcon = (label) => {
    switch (label) {
      case 'Home':
        return homeIcon;
      case 'Work':
        return workIcon;
      case 'Others':
        return othersIcon;
      default:
        return workIcon; // Default icon if label isn't matched
    }
  };

  const handleAddNewAddress = () => {
    // Navigate to the /profile/address route and pass the state indicating it came from the modal
    navigate('/profile/address', { state: { fromModal: true } });
  };
  return (
    <Modal show={show} onHide={onHide} className='addressChangeModal'>
      <div className='addressChangeModalContainer'>
      <div className='d-flex justify-content-center align-items-center'>
        <p className='cdaText text-center'>Choose a delivery address</p>
      </div>
      {addresses.map((address) => (
          <div 
          key={address.ID}
            className={`d-flex justify-content-start align-items-center py-3 px-2 w-100 choosenCatInfoContainer 
            ${selectedId === address.ID ? 'selected-address' : ''}`}
            onClick={() => handleAddressChange(address)}  // Handle address change
          >
        <Image src={getAddressIcon(address.category)} className="choosenCatIcon" alt={address.category} />
        <div className="d-flex flex-column mx-2">
              <p className="choosenCatText m-0 p-0">{address.category}</p>
              <p className="choosenCatInfo m-0 p-0">{`${address.line1}, ${address.line2}, ${address.pincode}, ${address.state}, ${address.country}`}</p>
            </div>
          </div>
        ))}
      <Modal.Footer className='d-flex justify-content-center align-items-center'>
        <button className='addnewaddressbutton' onClick={handleAddNewAddress}>+Add New Address</button>
      </Modal.Footer>
      </div>
    </Modal>
  );
};

export default AddressChangeModal