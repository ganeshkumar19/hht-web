import React, { useState, useEffect } from 'react';
import StoreItems from '../containers/StoreItems';
import FirstSection from '../containers/FirstSection';
import Banner from '../containers/HomeBanner';
import FanFamBanner from '../containers/FanFamBanner';
import Direct from '../containers/DirectionBanner';
import MusicDir from '../containers/MusicDir';
import MovieListBanner from '../containers/MovieListBanner';
import TicketCard from '../components/TicketCard';
import MerchBookingModal from '../modals/MerchBookingModal';
import RedirectBanner from '../containers/RedirectBanner'


const Home = () => {
  const [showTicketBookingModal, setShowTicketBookingModal] = useState(false);
  const [showTicketCard, setShowTicketCard] = useState(false);
  const [showHomeLoginModal, setShowHomeLoginModal] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const isFirstTimeLogin = sessionStorage.getItem('firstTimeLogin') === 'true';
    

    if (!accessToken) {
      // Show the booking modal if accessToken is not available
      const modalTimer = setTimeout(() => {
        setShowTicketBookingModal(true);
      }, 2000);

      return () => clearTimeout(modalTimer); // Cleanup timer on component unmount
    } else if (accessToken && isFirstTimeLogin) {
      setShowTicketCard(true);
      sessionStorage.removeItem('firstTimeLogin');
    } else {
      // Show the booking modal after 3 seconds if conditions are not met
      const fallbackTimer = setTimeout(() => {
        setShowTicketBookingModal(true);
      }, 3000);

      return () => clearTimeout(fallbackTimer); // Cleanup timer on component unmount
    }
  }, []); // Empty dependency array ensures it runs once on mount

  // Function to handle closing of the ticket card
  const handleTicketCardClose = () => {
    setShowTicketCard(false);
    // Show the booking modal after 2 seconds of closing the ticket card
    const timer = setTimeout(() => {
      setShowTicketBookingModal(true);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timeout when component unmounts or state changes
  };

  return (
    <>
      {/* Conditional Rendering of Modals */}
      {showTicketCard && (
        <TicketCard show={showTicketCard} onHide={handleTicketCardClose} />
      )}
      {showTicketBookingModal && (
        <MerchBookingModal
          show={showTicketBookingModal}
          onHide={() => setShowTicketBookingModal(false)}
        />
      )}
      {/* Content Sections */}
      <Banner />
      <RedirectBanner/>
      <FirstSection />
      <StoreItems />
      <FanFamBanner />
      <MovieListBanner />
      <Direct />
      <MusicDir />
    </>
  );
};

export default Home;