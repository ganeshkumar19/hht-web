import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../assets/styles/deletemodalstyles.css'
import { toast } from 'react-toastify';

const DeleteModal = ({ showModal, handleClose, handleDelete }) => {

    return (
        <Modal show={showModal} onHide={handleClose} centered className='DeleteModal'>
            <Modal.Body className='DeleteBody'>
                <h4>Delete Info</h4>
                <p>Are you sure you want to delete your current details and re-upload new information?</p>
            </Modal.Body>
            <Modal.Footer className='Deletefooter'>
                <button  className='deleteButton cancelButton' onClick={() => {
                    handleDelete();
                    handleClose();
                }}>
                    Delete
                </button>
                <button className='deleteButton' onClick={handleClose}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;