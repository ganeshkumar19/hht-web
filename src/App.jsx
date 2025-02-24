import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Import Home component
import FAV from './assets/images/hhtlogo.png';
import axios from 'axios';
import { CartProvider } from './contexts/CartContext';
import { motion } from 'framer-motion';
import Events from './pages/Events';
import ScrollToTop from './components/ScollToTop';
import PageWithNavbarFooter from './components/PageWithNavbarFooter';
import Merchandise from './pages/merchandisepage/Merchandise';
import ProductDetailsCard from './pages/merchandisepage/ProductDetailsCard';
import { ProductsProvider } from './contexts/ProductContext';
// Remove the direct import of CartItems
// import CartItems from './pages/merchandisepage/CartItems';
import Hhthub from './pages/hhthubpage/Hhthub';
import Bars from './pages/hhthubpage/Bars';
import FanFam from './pages/fanfampage/FanFam';
import OTPlogin from './pages/loginpage/OTPlogin';
import RegisterPage from './pages/loginpage/RegisterPage';
import Profile from './pages/profilepage/Profile';
import Career from './pages/careerpage/Career';
import HhtMoviesQr from './pages/HhtMoviesQr';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CareerForms from './pages/careerpage/CareerForms';
import Tamilandamvmt from './pages/mvmtpage/Tamilandamvmt';
import TermsConditions from './pages/tppages/TermsConditions';
import PrivacyPolicy from './pages/tppages/PrivacyPolicy';
import LoginModal from './modals/LoginModal';
import { useLogin } from './contexts/LoginContext';
import { useUserDetails } from './contexts/UserContext';
import ShortFlims from './pages/mvmtpage/ShortFlims';
import { FlimProvider } from './contexts/ShortFlimsContext';
import ShortFlimEpisodes from './pages/mvmtpage/ShortFlimEpisodes';
import UserAddress from './pages/profilepage/UserAddress';
import { AddressProvider } from './contexts/AddressContext';
import ReturnPolicy from './pages/tppages/ReturnPolicy';
import AboutUs from './pages/acpages/AboutUs';
import ContactUs from './pages/acpages/ContactUs';
import Orders from './pages/orderpage/Orders';
import { ProtectedRoute } from './components/ProtectedRoute';

// Lazy-load CartItems
const CartItems = lazy(() => import('./pages/merchandisepage/CartItems'));

function App() {
  const { fetchUserData } = useUserDetails();
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const { showLoginModal, showGuestModal } = useLogin();

  const clearLocalStorage = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('userId');
    localStorage.removeItem('userDetails');
  };

  const isTokenExpired = () => {
    const expiresIn = localStorage.getItem('expires_in');
    if (!expiresIn) return true; // No expires_in, assume token is expired

    const currentTime = Math.floor(Date.now() / 1000); 
    return currentTime > parseInt(expiresIn, 10); 
  };

  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      const formData = new URLSearchParams();
      formData.append('grant_type', 'access');
      formData.append('refresh_token', refreshToken);

      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/identity/users/auth/token`, formData.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if (response.data && response.data.status === 'success' && response.data.data) {
          const { access_token, expires_in, id_token, refresh_token } = response.data.data;

          localStorage.setItem('access_token', access_token);
          localStorage.setItem('expires_in', String(expires_in)); // Store expires_in as a string
          localStorage.setItem('id_token', id_token);
          localStorage.setItem('refresh_token', refresh_token);
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        clearLocalStorage(); 
      }
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      // Check if the token is expired
      if (isTokenExpired()) {
        clearLocalStorage(); // Clear all local storage if token has expired
        setLoading(false);
        return;
      }

      if (userId) {
        await refreshToken();
        await fetchUserData(userId);
      }
      setLoading(false);
    };

    init();
  }, [refreshToken]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <motion.img
            src={FAV}
            alt="Loading..."
            className="loader-image"
            variants={{
              breathe: {
                scale: [1, 1.2, 1],
                transition: {
                  duration: 1.6,
                  ease: [0.6, 0.01, -0.05, 0.9],
                  repeat: Infinity,
                  repeatType: "loop",
                },
              },
            }}
            animate="breathe"
          />
        </div>
      </div>
    );
  }

  return (
    <>
          {showLoginModal && <LoginModal />}

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover toastClassName="custom-toast" bodyClassName="custom-toast-body" />
      <ScrollToTop />
      <AddressProvider>
        <CartProvider>
          <ProductsProvider>
            <Routes>
              <Route path="/" element={<Home />} /> {/* Ensure Home route is defined */}
              <Route path="/events" element={<PageWithNavbarFooter component={Events} />} />
              <Route path="/merch" element={<PageWithNavbarFooter component={Merchandise} />} />
              <Route path="/merch/product/:productId" element={<PageWithNavbarFooter component={ProductDetailsCard} />} />
              <Route
                path="/merch/products/cart"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <PageWithNavbarFooter component={CartItems} />
                  </Suspense>
                }
              />            
              <Route path="/orders" element={<ProtectedRoute><PageWithNavbarFooter component={Orders} /></ProtectedRoute>} />
              <Route path="/hhthub" element={<ProtectedRoute><PageWithNavbarFooter component={Hhthub} /></ProtectedRoute>} />
              <Route path="/hhthub/bars" element={<ProtectedRoute><PageWithNavbarFooter component={Bars} /></ProtectedRoute>} />
              <Route path="/fanfam" element={<ProtectedRoute><PageWithNavbarFooter component={FanFam} /></ProtectedRoute>} />
              <Route path="/login" element={<OTPlogin />} /> {/* Add the /login route */}
              <Route path="/register" element={<RegisterPage />} /> {/* Add the /register route */}
              <Route path="/profile" element={<ProtectedRoute><PageWithNavbarFooter component={Profile} /></ProtectedRoute>} />
              <Route path="/profile/address" element={<ProtectedRoute><PageWithNavbarFooter component={UserAddress} /></ProtectedRoute>} />
              <Route path="/career" element={<PageWithNavbarFooter component={Career} />} />
              <Route path="/careerforms" element={<PageWithNavbarFooter component={CareerForms} />} />
              <Route path="/hhtmoviesqr" element={<PageWithNavbarFooter component={HhtMoviesQr} />} />
              <Route path="/mvmt" element={<FlimProvider><PageWithNavbarFooter component={Tamilandamvmt} /></FlimProvider>} />
              <Route path="/mvmt/shortflims" element={<ProtectedRoute><FlimProvider><PageWithNavbarFooter component={ShortFlims} /></FlimProvider></ProtectedRoute>} />
              <Route path="/mvmt/shortflims/:shortflimId" element={<ProtectedRoute><FlimProvider><PageWithNavbarFooter component={ShortFlimEpisodes} /></FlimProvider></ProtectedRoute>} />
              <Route path="/T&C" element={<ProtectedRoute><TermsConditions /></ProtectedRoute>} />
              <Route path="/privacypolicy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
              <Route path="/returnpolicy" element={<ProtectedRoute><ReturnPolicy /></ProtectedRoute>} />
              <Route path="/about" element={<ProtectedRoute><PageWithNavbarFooter component={AboutUs} /></ProtectedRoute>} />
              <Route path="/contact" element={<ProtectedRoute><PageWithNavbarFooter component={ContactUs} /></ProtectedRoute>} />
              {/* Add a fallback route to handle undefined routes */}
              <Route path="*" element={<Home />} /> {/* Redirect to Home if no route is matched */}
            </Routes>
          </ProductsProvider>
        </CartProvider>
      </AddressProvider>
    </>
  );
}

export default App;