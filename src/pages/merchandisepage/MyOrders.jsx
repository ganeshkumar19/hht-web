import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import HeaderCard from '../../components/HeaderCard';
import '../../assets/styles/orderstyles.css';
import { useUserDetails } from '../../contexts/UserContext';
import LoaderComponent from '../../components/LoaderComponent';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrderInfoCard from '../../components/OrderInfoCard';
import OrdersTab from '../../components/OrdersTab';
import PaginationComponent from '../../components/PaginationComponent';
import { fetchGuestOrders, fetchLoggedInUserOrders } from '../../apifunctions/myOrdersApi';

const MyOrders = () => {
  const { userDetails } = useUserDetails();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); // Keep currentPage as zero-based for API compatibility
  const [totalPages, setTotalPages] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [userLoading, setUserLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [activeCategory, setActiveCategory] = useState('in-transit');

  const handleReturnHome = () => {
    navigate('/'); // Navigate to home after closing modal
  };
  
  // Fetch orders for logged-in users
  useEffect(() => {
    const fetchOrders = async (page = 0) => {
      if (userDetails && userDetails.status !== 'guest') {
        setUserLoading(true);
        try {
          const token = localStorage.getItem('access_token');
          const data = await fetchLoggedInUserOrders(page, token);
          setOrderData(data.data);
          setTotalPages(data.pagination.total);
        } catch (error) {
          toast.error('We were unable to retrieve your orders at this time. Please log out and try again.');
        } finally {
          setUserLoading(false);
        }
      }
    };

    // Call the function if userDetails is set and status is not 'guest'
    if (userDetails && userDetails.status !== 'guest') {
      fetchOrders(currentPage);
    }
  }, [userDetails, currentPage]);

  // Fetch guest orders with pagination

  // Handle form submission for guest users
  const handleSubmit = async () => {
    if (errors.email || errors.phone) {
      alert('Please correct the errors in the form.');
      return;
    }

    if (!formData.email || !formData.phone) {
      alert('Both email and phone number are required!');
      return;
    }

    setLoading(true);

    try {
      // Guest user API call with pagination
      const data = await fetchGuestOrders(currentPage, formData.email, formData.phone);
      setOrderData(data.data); // Save the API response in state
      setTotalPages(data.pagination.total); // Save the total number of pages
    } catch (error) {
      toast.error('We were unable to retrieve your orders at this time. Kindly try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDetails && userDetails.status !== 'registered' && formData.email && formData.phone) {
      handleSubmit(); // Automatically submit the form when the page changes
    }
  }, [currentPage]);

  // Filter orders
  const inTransitOrders = useMemo(() => {
    return orderData?.filter(order =>
      order.status === 'Confirmed' || order.status === 'Shipped'
    );
  }, [orderData]);

  const pastOrders = useMemo(() => {
    return orderData?.filter(order =>
      order.status === 'Delivered' || order.status === 'Canceled'
    );
  }, [orderData]);

  const categories = [
    { id: 'in-transit', name: 'In-Transit Orders' },
    { id: 'past-orders', name: 'Past Orders' },
  ];


  const formFields = [
    {
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter your phone number',
      field: 'phone',
    },
    {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      field: 'email',
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    validateInput(field, value);
  };

  const validateInput = (name, value) => {
    let error = '';
    switch (name) {
      case 'phone':
        if (!/^\d{10}$/.test(value)) {
          error = 'Please enter a valid 10-digit contact number.';
        }
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Please enter a valid email address.';
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };
  


  const toggleCategory = (categoryId) => {
    setActiveCategory(categoryId); // Update activeCategory based on the clicked tab
  };

  if (userLoading) {
    return <LoaderComponent />;
  }


  return (
    <Container fluid className="odrContainer">
      <HeaderCard backgroundColor={"#3EA66B"} color={"#F4E003"} name={"Orders"} />
      
      <Container fluid className="orderPageContainer">
      {!orderData && !userLoading && (
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="orderContainer my-4 p-2">
            <Form onSubmit={handleSubmit} className="orderForms">
              <h2 className="mt-4 mb-4 text-center eydText">Enter your details to view orders</h2>
              {formFields.map(({ label, type, placeholder, field }) => (
                <Form.Group as={Row} controlId={`form-${field}`} key={field} className="my-3">
                  <Form.Label column sm="4" className="orderlabel">{label}</Form.Label>
                  <Col sm="8" className="eydInput">
                    <Form.Control
                      type={type}
                      placeholder={placeholder}
                      value={formData[field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      isInvalid={!!errors[field]}
                      required
                    />
                    <Form.Control.Feedback type="invalid">{errors[field]}</Form.Control.Feedback>
                  </Col>
                </Form.Group>
              ))}
            </Form>
            <div className="d-flex justify-content-center align-items-center mt-2">
                <button disabled={loading} className="orderReviewButton" onClick={handleSubmit}>
                  {loading ? 'Loading...' : 'Search'}
                </button>
              </div>
          </Col>
        </Row>
        )}

        {orderData?.length === 0 && (
          <Row className="justify-content-center my-4">
            <Col xs={12} className="text-center">
              {userDetails && userDetails.status !== 'guest' ? (
                <h2 className="formal-text">You have not placed any orders yet.</h2>
              ) : (
                <h2 className="formal-text">
                  No orders found associated with this mobile number and email ID.
                </h2>
              )}
            </Col>
          </Row>
        )}

        {/* Show order details if orderData is available */}
        {orderData?.length > 0 && (
          <>
            <OrdersTab
              orders={categories}
              toggleCategory={toggleCategory}
              activeCategory={activeCategory}
            />

            {/* Render In-Transit Orders */}
            {activeCategory === 'in-transit' && (
              <>
                <Row className="mt-4">
                  {inTransitOrders?.length > 0 ? (
                    inTransitOrders.map((order) => (
                      <Row key={order.ID} className="justify-content-center my-4">
                        <OrderInfoCard order={order} />
                      </Row>
                    ))
                  ) : (
                    <Col xs={12} className="text-center">
                      <h2 className="formal-text">No In-Transit Orders</h2>
                    </Col>
                  )}
                </Row>

                {/* Show Pagination only if there are in-transit orders */}
                {inTransitOrders?.length > 0 && (
                  <PaginationComponent 
                    currentPage={currentPage + 1}
                    totalPages={totalPages} 
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}

            {/* Render Past Orders */}
            {activeCategory === 'past-orders' && (
              <>
                <Row className="mt-4">
                  {pastOrders?.length > 0 ? (
                    pastOrders.map((order) => (
                      <Row key={order.ID} className="justify-content-center my-4">
                        <OrderInfoCard order={order} />
                      </Row>
                    ))
                  ) : (
                    <Col xs={12} className="text-center">
                      <h2 className="formal-text">No Past Orders</h2>
                    </Col>
                  )}
                </Row>

                {/* Show Pagination only if there are past orders */}
                {pastOrders?.length > 0 && (
                  <PaginationComponent 
                    currentPage={currentPage + 1}
                    totalPages={totalPages} 
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </>
        )}
        {orderData?.length >0 && <div className="my-3 d-flex justify-content-center align-items-center">
            <button className='orderreturnButton' onClick={handleReturnHome}>
            Return Home
            </button>
        </div>}
      </Container>
    </Container>
  );
};

export default MyOrders;
