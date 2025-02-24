import React from 'react';
import SIGNA from '../assets/images/signa.png';
import SCAN from '../assets/images/scanqr.png';
import './ticketstyles.css'; // Import the CSS module
import { Image } from 'react-bootstrap';
import ENTRY from '../assets/images/entry.png'
import { LuCrown } from "react-icons/lu";

function TicketCard() {
  return (
    <div className="ticketCard">
      <div className="topSection">
        <h2 className="title m-0 p-0">#HHT</h2>
        <span className="subtitle m-0 p-0">fanfam</span>
      </div>
      <div className='bottomSection m-0 p-4'>
        <div className='entrycardContainer'>
        <div className='entryImageContainer'>
          <Image fluid src={ENTRY} alt='entryImage' className='entryImage me-2'/>
        </div>
        <div className='entrydetailContainer'>
          <h4 className='entryName'>Yaswanth</h4>
          <p className='enRole m-0 p-0'>President <LuCrown style={{width: '20px', color: 'gold'}}/></p>
          <p className='enLocation m-0 p-0'>Coimbatore, Tamilnadu</p>
        </div>
        </div>
        <div className="signScanContainer mt-4">
        <div className='d-flex flex-column align-items-center justify-content-end'>
        <img className="signature" src={SIGNA} alt="Signature" />
        <p>Signature</p>
        </div>
       {/* <div className='d-flex flex-column align-items-center justify-content-center'>
        <img className="qrCode" src={SCAN} alt="QR Code" />
        <p>Scan this QR</p>
        </div>*/}
       
        
      </div>
      </div>
      
    </div>
  );
}

export default TicketCard;
