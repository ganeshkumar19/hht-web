import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import '../assets/styles/emdmodalstyles.css'


const TestingButton = () => {
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');

    const handleVideoClick = (videoUrl) => {
        setCurrentVideoUrl(videoUrl);
        setShowVideoModal(true);
      };

      const handleCloseModal = () => {
        setShowVideoModal(false);
        setCurrentVideoUrl('');
      };

  return (
    <>
    <button onClick={() => handleVideoClick("https://www.youtube.com/embed/7BPMBsC1Z7Q?si=icsO8-KOxKft2ddl")}>
        click me
    </button>
    <Modal show={showVideoModal} onHide={handleCloseModal} centered size="lg" className='emdModalContainer'>
        <Modal.Header className='emdModal' closeButton>
          <Modal.Title className='emdModalTitle'>Watch Video</Modal.Title>
        </Modal.Header>
        <Modal.Body className='emdModalBody m-0 p-0'>
          <iframe
            src={currentVideoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className='emdIframe m-0 p-0'
          ></iframe>
        </Modal.Body>
        <Modal.Footer className='m-0 p-0'>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TestingButton