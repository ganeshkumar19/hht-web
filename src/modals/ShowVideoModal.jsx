import React from 'react'
import '../assets/styles/emdmodalstyles.css'


const ShowVideoModal = ({currentVideoUrl, showVideoModal, handleCloseModal}) => {
  return (
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
  )
}

export default ShowVideoModal