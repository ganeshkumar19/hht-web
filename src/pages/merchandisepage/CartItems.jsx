import React, { useContext, useEffect, useMemo, useState } from 'react';
import '../../assets/styles/cartstyles.css';
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import CartContext from '../../contexts/CartContext';
import HeaderCard from '../../components/HeaderCard';
import { toast } from 'react-toastify';
import { useUserDetails } from '../../contexts/UserContext';
import PaymentConfirmationModal from '../../modals/PaymentConfirmationModal';
import PaymentRejectionModal from '../../modals/PaymentRejectionModal';
import AddressChangeModal  from '../../modals/AddressModal';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import LoaderComponent from '../../components/LoaderComponent';
import { handleRazorpayPayment, placeOrder, updateCart } from '../../apifunctions/OrderCreationApi';
import GuestAddressModal from '../../modals/GuestAddressModal';

const CartItems = () => {
  const { cart=[], removeFromCart, setCart, cartId, setCartId } = useContext(CartContext);
  const { userDetails} = useUserDetails();
  const addresses = userDetails?.addresses || [];
  const [loading, setLoading] = useState(false);
  const [loadingIncreaseId, setLoadingIncreaseId] = useState(null); // Loading state for increase action
  const [loadingDecreaseId, setLoadingDecreaseId] = useState(null);
  const [loadingRemoveId, setLoadingRemoveId] = useState(null); // Loading state for decrease action
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [showPaymentRejection, setShowPaymentRejection] = useState(false);
  const [paymentAttempted, setPaymentAttempted] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));

  const [isGuest, setIsGuest] = useState(false); // State to track if the user is a guest

  // Check if the user is a guest by examining the status in userDetails
  useEffect(() => {
    if (userDetails?.status === 'guest') {
      setIsGuest(true);
    } else {
      setIsGuest(false);
    }
  }, [userDetails]);




  useEffect(() => {
    if (!cartId) 
      return;

    const fetchCartData = async () => {
      setLoading(true); // Start loading before API call
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/merchant/cart/${cartId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }); // Log the cart data
        setCart(response.data.data.items);
      } catch (error) {
        setCart([])
      } finally {
        setLoading(false); // Stop loading after API call finishes
      }
    };

    fetchCartData();
  }, [cartId, accessToken]);

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  
  
  useEffect(() => {
    if (addresses.length > 0) {
      // Find the address with is_primary: true
      const primaryAddress = addresses.find((address) => address.is_primary);
    
      if (primaryAddress) {
        setSelectedAddress(primaryAddress); // Store the full primary address object
        setSelectedAddressId(primaryAddress.ID);
      } else {
        setSelectedAddress(addresses[0]); // Store the first address object if no primary address is found
        setSelectedAddressId(addresses[0].ID);
      }
    } else {
      setSelectedAddress(null); // Set to null when no address exists
      setSelectedAddressId(null);
    }
  }, [addresses]);

  const handleAddressModal = () => {
    setShowAddressModal(true);
  };

  
  const handleAddressChange = (address) => {
    setSelectedAddress(address); // Set the full address object
    setSelectedAddressId(address.ID);
    setShowAddressModal(false);
  };


  const emailContact = useMemo(() => {
    return (
      userDetails?.contacts?.find(contact => contact.contact_type === 'email')?.contact ||
      selectedAddress?.email || '' // Fallback to selectedAddress.email
    );
  }, [userDetails, selectedAddress?.email]);

  const phoneContact = useMemo(() => {
    return (
      userDetails?.contacts?.find(contact => contact.contact_type === 'phone')?.contact ||
      selectedAddress?.contact_no || '' // Fallback to selectedAddress.contact_no
    );
  }, [userDetails, selectedAddress?.contact_no]);

  // Dynamically load the Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleRemoveFromCart = async (cartItemId) => {
    setLoadingRemoveId(cartItemId); // Set loading state for this item
    try {
      const accessToken = localStorage.getItem('access_token'); // Get the access token

      // API request to remove item from backend with access_token
      await axios.delete(`${import.meta.env.VITE_BASE_API_URL}/merchant/cartItem/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Pass the access token in the header
        },
      });

      // Call removeFromCart to update frontend state
      removeFromCart(cartItemId);
    } catch (error) {
      alert('Failed to remove the item. Please try again.');
    } finally {
      setLoadingRemoveId(null); // Reset loading state after API call
    }
  };

  const handlePayment = async () => {
    if (!selectedAddress) {
      toast.error('Please select an address before proceeding.');
      return;
    }
  
    try {
      setPaymentLoading(true);
      const accessToken = localStorage.getItem('access_token');
      const grandTotal = total + (total > 0 ? 199 : 0);
      const paymentDetails = { id: cartId, total_price: grandTotal };
  
      // Step 1: Update the cart
      const cartResponse = await updateCart(cartId, paymentDetails, accessToken);
  
      if (cartResponse.data.status === 'success') {
        const cartData = cartResponse.data.data;


  
        const orderDetails = {
          cart_id: cartData.ID,
          billing_address_id: selectedAddressId,
          shipping_address_id: selectedAddressId,
          shipping_rate: 199.0
        };
  
        const orderResponse = await placeOrder(orderDetails, accessToken);
        const orderData = orderResponse.data?.data?.order;

        const razor_key = orderResponse.data?.data?.razor_key
        await handleRazorpayPayment(loadRazorpayScript, orderData, razor_key, grandTotal * 100, addresses, selectedAddressId, accessToken, cart, userDetails, emailContact, phoneContact, setShowPaymentRejection,setPaymentAttempted, setShowConfirmation, setPaymentDetails, setCart, setPaymentLoading);
      }
    } catch (error) {
      toast.error(error.message);
      setPaymentLoading(false);
    } 
  };
  


  
  

  const increaseQuantity = async (cartItem) => {
    if (cartItem.quantity >= 10) {
      toast.error('Quantity should not exceed beyond 10.');
      return;
    }
    if (cartItem.quantity < cartItem.product_variant.quantity && cartItem.quantity < 10) {
      setLoadingIncreaseId(cartItem.ID); // Set loading state for this item
      try {
        const updatedQuantity = cartItem.quantity + 1;
        const accessToken = localStorage.getItem('access_token')// Get the access token

        // API request to update quantity in backend with access_token
        await axios.put(`${import.meta.env.VITE_BASE_API_URL}/merchant/cartItem/${cartItem.ID}`, {
          ID: cartItem.ID,
          quantity: updatedQuantity, // Send the new quantity
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the header
          },
        });

        setCart(
          cart.map((item) =>
            item.ID === cartItem.ID
              ? { ...item, quantity: updatedQuantity }
              : item
          )
        );
      } catch (error) {
        alert('Failed to update the quantity. Please try again.');
      } finally {
        setLoadingIncreaseId(null);
      }
    } else {
      toast.error(`Cannot add more than ${cartItem.product_variant.quantity} items.`);
    }
  };
  
  const decreaseQuantity = async (cartItem) => {
    if (cartItem.quantity > 1) {
      setLoadingDecreaseId(cartItem.ID); // Set loading state for this item
      try {
        const updatedQuantity = cartItem.quantity - 1;
        const accessToken = localStorage.getItem('access_token'); // Get the access token

        // API request to update quantity in backend with access_token
        await axios.put(`${import.meta.env.VITE_BASE_API_URL}/merchant/cartItem/${cartItem.ID}`, {
          ID: cartItem.ID,
          quantity: updatedQuantity, // Send the new quantity
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the header
          },
        });

        setCart(
          cart.map((item) =>
            item.ID === cartItem.ID
              ? { ...item, quantity: updatedQuantity }
              : item
          )
        );
      } catch (error) {
        alert('Failed to update the quantity. Please try again.');
      } finally {
        setLoadingDecreaseId(null);
      }
    } else {
      toast.error('Quantity cannot be less than 1.');
    }
  };

  if (loading) {
    return <LoaderComponent/>
  }

  if (cart.length === 0) {
    return (
      <Container fluid className="cartContainer">
        <Row className="d-flex justify-content-center align-items-center my-5">
          <Col className="d-flex justify-content-center align-items-center">
            <p className="npcText">No products in the cart.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className='cartContainer'>
      <HeaderCard backgroundColor={'#3EA66B'} color={'#F4E003'} name='Cart' />
      {cart.length > 0 ? (
        <Container>
          <Row className='mt-3 d-flex justify-content-center justify-content-sm-end align-items-center'>
            <Col xs={12} className='addressColumn d-flex justify-content-between align-items-center my-3'>
            <div className='deliverContainer p-0 m-0 w-100'>

                <p className='p-0 m-0 deliverText'>
                      Deliver to:  {selectedAddress
                  ? `${selectedAddress.category}, ${selectedAddress.pincode}` // Use selectedAddress properties when available
                  : 'No address selected' // Fallback when no address is selected
                }
                </p>
              </div>
              <div className='changeAddressContainer'>
                <p className='changeAddressText' onClick={handleAddressModal}>
                  {selectedAddress ? 'Change' : 'Add'}
                </p>
              </div>
            </Col>
          </Row>
          {cart.map((cartItem) => (
            <React.Fragment key={cartItem.ID}>
              <Row className='my-3 d-flex justify-content-center align-items-center'>
                <Col xs={12} className='cartImageRow'>
                  <Row>
                    <Col xs={4} lg={3} className='cartImageColumn'>
                     <div className='cartImageContainer'>
                     {cartItem?.product?.images?.length > 0 ? (
                <Image
                  fluid
                  src={cartItem.product.images[0].image_url} // Safe access to the image
                  alt='product-image'
                  className='crtImage'
                />
              ) : (
              null
              )}
                      </div>
                    </Col>
                    <Col xs={6} lg={7} className='cartDetails m-0 p-0'>
                      <p className='cartprName p-0 m-0'>{cartItem?.product?.name}</p>
                      <div className='d-flex justify-content-start align-items-center w-100 my-1'>
                        <div className='ssSizeContainer d-flex align-items-center'>
                          <p className='m-0 p-0'>Size: {cartItem?.product_variant?.variant_size}</p>
                        </div>
                        <div className='ssSizeContainer d-flex align-items-center'>
                          <p className='m-0 p-0'>Qty</p>
                          <div className='d-flex align-items-center justify-content-between ms-2'>
                            <p className='m-0 px-1 actionicon' onClick={() => decreaseQuantity(cartItem)}>
                            {loadingDecreaseId === cartItem.ID ? <FaSpinner className="loadingSpinner" /> : '-'}
                            </p>
                            <p className='m-0 px-1'>{cartItem.quantity}</p>
                            <p className='m-0 px-1 actionicon' onClick={() => increaseQuantity(cartItem)}>
                            {loadingIncreaseId === cartItem.ID ? <FaSpinner className="loadingSpinner" /> : '+'}
                            </p>

                          </div>
                        </div>
                      </div>
                      <p className='cartprprice p-0 m-0 mt-1 mt-md-3 d-flex justify-content-start align-items-center'><span className='carogprice me-3'>₹{cartItem?.product?.base_price}</span> ₹{cartItem?.price}</p> {/* Price */}
                      <p className='cartmrptext'>MRP incl. of all taxes</p>
                      <p className='cartmrproff'>{cartItem?.product?.discount}% off</p> {/* Discount */}
                    </Col>
                    <Col xs={2} lg={2} className='cartDetailsIcon d-flex align-items-start justify-content-end'>
                    {loadingRemoveId === cartItem.ID ? (
                        <FaSpinner className="loadingSpinner" />  // Show the spinner when API call is in progress
                      ) : (
                        <FaTimes
                          className="closeIcon"
                          onClick={() => handleRemoveFromCart(cartItem.ID)}  // Show the close icon otherwise
                        />
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </React.Fragment>
          ))}
          <Row className='my-4 d-flex justify-content-center align-items-center'>
            <Col xs={12} className='cartPriceRow'>
              <h4 className='pricedetailtext'>Price Details</h4>
            </Col>
            <Col xs={12} className='cartPriceRow'>
              <div className='cartTotalContainer d-flex align-items-center justify-content-between mx-2'>
              <p>Cart Total</p>
              <p>₹{total}</p>
              </div>
              <div className='cartTotalContainer d-flex align-items-center justify-content-between mx-2'>
                <p>Shipping Charges</p>
                <p>₹{total > 0 ? 199 : 0}</p>
              </div>
              <div className='totalAmountContainer d-flex align-items-center justify-content-between mx-2'>
                <p>Total Amount</p>
                <p>₹{total + (total > 0 ? 199 : 0)}</p>
              </div>
            </Col>
          </Row>
          <Row className='my-3 d-flex justify-content-center align-items-center'>
            <Col xs={12} className='d-flex justify-content-center align-items-center'>
            <button 
                className='paymentProductButton'
                onClick={handlePayment}
                disabled={paymentLoading} // Disable button while loading
              >
                {paymentLoading ? (
                  <Spinner animation="border" size="sm" />  // Show spinner during loading
                ) : (
                  'Payment'
                )}
              </button>
            </Col>
          </Row>
          {showConfirmation && (
            <PaymentConfirmationModal
              show={showConfirmation}
              onHide={() => {
                setShowConfirmation(false);
                setCart([]);
                setCartId(null) 
              }}
              paymentDetails={paymentDetails}
            />
          )}
           {showPaymentRejection && !showConfirmation && ( // Don't show rejection modal if payment is successful
            <PaymentRejectionModal
              show={showPaymentRejection}
              onHide={() => {
              setShowPaymentRejection(false)}}
              onTryAgain={handlePayment} // Retry payment on 'Try Again'
            />
          )}
         {showAddressModal && (
            isGuest ? (
              <GuestAddressModal
                show={showAddressModal}
                onHide={() => setShowAddressModal(false)}
                handleAddressChange={handleAddressChange}
                setSelectedAddress={setSelectedAddress} // Ensure this is passed correctly
              />
            ) : (
              <AddressChangeModal
                show={showAddressModal}
                onHide={() => setShowAddressModal(false)}
                selectedId={selectedAddressId}
                addresses={addresses}
                handleAddressChange={handleAddressChange}
              />
            )
          )}

        </Container>
      ) : ( null  )}
    </Container>
  );
};

export default CartItems;