import React, { useEffect, useState } from 'react';
import SIGNA from '../assets/images/signa.jpg';
import SCAN from '../assets/images/scanqr.png';
import '../assets/styles/ticketstyles.css'; // Import the CSS module
import { Image, Modal } from 'react-bootstrap';
import ENTRY from '../assets/images/entry.png'
import { LuCrown } from "react-icons/lu";
import { FaTimes } from "react-icons/fa";
import Confetti from 'react-confetti';
import ML from '../assets/images/memberlogo.png'
import { useUserDetails } from '../contexts/UserContext';
import { QRCodeCanvas } from 'qrcode.react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function TicketCard({ show, onHide }) {
  const [runConfetti, setRunConfetti] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { userDetails } = useUserDetails();

  const qrValue = JSON.stringify({
    Id: userDetails?.id,
    Name: userDetails?.display_name,
    Zone: userDetails?.zone,
    Type: userDetails?.roles[0].user_role
  });


  useEffect(() => {
    if (show && userDetails) {
        setRunConfetti(true);
        setShowConfetti(true);
        const timer = setTimeout(() => {
            setRunConfetti(false);
            const fadeOutTimer = setTimeout(() => {
                setShowConfetti(false);
            }, 500);
            return () => clearTimeout(fadeOutTimer);
        }, 5000);
        return () => clearTimeout(timer);
    } else {
        setShowConfetti(false);
    }
  }, [show, userDetails]); 

  const confettiStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1040,
    opacity: runConfetti ? 1 : 0,
    transition: 'opacity 1s ease-in-out'
  };

  if (!userDetails) {
    // Optionally, render a loading state or nothing until userDetails are loaded
    return null; // or <LoadingIndicator /> for a better user experience
  }

  return (
    <>
     {showConfetti && <div style={confettiStyle}><Confetti numberOfPieces={600} width={window.innerWidth} height={window.innerHeight} run={runConfetti} /></div>}
     {show && ( // Ensure the modal is shown only when 'show' is true and userDetails are loaded
      <Modal show={show} onHide={onHide} centered className='ticketCard' size="lg" style={{zIndex: 1050}}  backdropClassName="transparent-backdrop"  backdrop={true}>
        <div className='closeicon'>
          <FaTimes style={{width: '20px', cursor: 'pointer'}} onClick={onHide}/>
        </div>
        <div className="topSection">
          <h2 className="hhttitle m-0 p-0">#HHT</h2>
          <span className="subtitle m-0 p-0">fanfam</span>
          <div className='memberLogoContainer'>
            <Image fluid src={ML} className='mlImage'/>
          </div>
        </div>
        <div className='bottomSection m-0 p-0'>
          <div className='entrycardContainer p-3'>
             <div className='entryImageContainer me-2'>
                <LazyLoadImage src={userDetails?.image_url || ENTRY} alt='entryImage' placeholderSrc={ENTRY} effect="blur" className='entryImage'/>
              </div>
            <div className='entrydetailContainer'>
              <h4 className='entryName m-0 p-0'>{userDetails?.display_name}</h4>
              <p className='enRole m-0 p-0'>{userDetails?.roles[0].user_role} <LuCrown style={{width: '20px', color: 'gold'}}/></p>
              <p className='enLocation m-0 p-0'>{userDetails?.zone}</p>
            </div>
          </div>
          <div className="dashedLine my-2 m-0"></div>
          <div className="signScanContainer mt-2  p-3">
            <div className='d-flex flex-column align-items-center justify-content-center'>
              <img className="signature" src={SIGNA} alt="Signature" />
              <p className='m-0 p-0 signScanText'>Signature</p>
            </div>
            <div className='d-flex flex-column align-items-center justify-content-center'>
              <QRCodeCanvas value={qrValue} size={50} level={"H"} />
              <p className='m-0 p-0 signScanText'>Scan this QR</p>
            </div>
          </div>
        </div>
      </Modal>
     )}
    </>
  );
}

export default TicketCard;
