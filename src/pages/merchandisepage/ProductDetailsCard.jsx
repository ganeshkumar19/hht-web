import React, { useState, useEffect, useCallback } from 'react';
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import '../../assets/styles/productdetailscardstyles.css';
import { useProducts } from '../../contexts/ProductContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import HeaderCard from '../../components/HeaderCard';
import { fetchCartData } from '../../apifunctions/fetchCart';
import { addToCartAPI, removeFromCartAPI } from '../../apifunctions/cartActionsApi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import LoaderComponent from '../../components/LoaderComponent';
import { useLogin } from '../../contexts/LoginContext'; 
import { useUserDetails } from '../../contexts/UserContext';  // Import user details context
import GuestModal from '../../modals/GuestModal';
import SC from '../../assets/images/sizecart.png'
import RD from '../../assets/images/reddragon.png'
import RD2 from '../../assets/images/redDragon2.png'
import { renderSizeButton } from '../../functions/renderSizeButton';

const ProductDetailsCard = () => {
  const navigate = useNavigate();
  const { setCart } = useCart();
  const { products = [], productsLoading } = useProducts();
  const { productId } = useParams();
  const product = products.find((p) => p.id.toString() === productId);
  const images = product?.images || [];
  const [image, setImage] = useState('');
  const [zoom, setZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: '0%', y: '0%' });
  const [selectedSize, setSelectedSize] = useState('');
  const [existingCart, setExistingCart] = useState(null);
  const [cartItemIds, setCartItemIds] = useState({});
  const [addingToCart, setAddingToCart] = useState(false);
  const [removingFromCart, setRemovingFromCart] = useState(false);
  const { toggleGuestModal } = useLogin(); // Only use modal toggle
  const { fetchUserData } = useUserDetails();

  // Only fetch access_token from localStorage, no guest_access_token
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));

  const handleAccessTokenUpdate = (newToken) => {
    setAccessToken(newToken);
  };

  // Check user authentication status using fetchUserData
  const checkAuthStatus = async () => {
    const userToken = localStorage.getItem('access_token');
  
    if (!userToken) {
      // If no access token is present, return false
      return false;
    }
  
    try {
      // If the user access token is present, fetch user data
      const user = await fetchUserData(localStorage.getItem('userId'));
      return true; // User is authenticated
    } catch (error) {
      return false; // Failed to fetch user data, consider user unauthenticated
    }
  };

  const handleCartClick = async () => {
    const isAuthenticated = await checkAuthStatus(); // Check if user is authenticated
    if (!isAuthenticated) {
      toggleGuestModal(); // Show login modal if not authenticated
      return;
    }

      navigate(`/merch/products/cart`);
   
  };

  useEffect(() => {
    setImage(images.length > 0 ? images[0].url : '');
  }, [images]);

  useEffect(() => {
    if (product && accessToken) {
      const getCartData = async () => {
        try {
          // Fetch cart data using the unified access token
          const cartData = await fetchCartData(accessToken);

          setExistingCart(cartData);

          const newCartItemIds = {};
          cartData.items?.forEach((item) => {
            if (item?.product_id === product.id) {
              newCartItemIds[item?.product_variant_id] = item?.ID;
            }
          });
          setCartItemIds(newCartItemIds);
        } catch (error) {
        }
      };

      getCartData();
    }
  }, [product, accessToken]);

  const isSizeInCart = useCallback(
    (sizeId) => {
      return cartItemIds.hasOwnProperty(sizeId);
    },
    [cartItemIds]
  );

  // Toggle cart (add/remove item) for the selected size
  const toggleCart = useCallback(async () => {
    const isAuthenticated = await checkAuthStatus(); // Check if user is authenticated
    if (!isAuthenticated) {
      toggleGuestModal(); // Show login modal if not authenticated
      return;
    }

    if (!selectedSize) {
      alert('Please select a size before adding to the cart.');
      return;
    }

    const selectedVariant = product.sizes.find((s) => s.size === selectedSize);
    if (!selectedVariant) {
      alert('Selected size is not valid.');
      return;
    }

    const price = parseFloat(product.price.replace('₹', '').replace(',', '')); // Parse price

    const cartItem = {
      product_id: product.id,
      product_variant_id: selectedVariant.id,
      quantity: 1, // Default to 1 when adding to the cart
      price: price,
      cart_id: existingCart?.ID, // Use the cart ID from the fetched cart data
    };

    if (isSizeInCart(selectedVariant.id)) {
      removeFromCartAPI(
        selectedVariant.id,
        cartItemIds,
        setCart,
        setCartItemIds,
        setRemovingFromCart
      ); // Remove this size from the cart
    } else {
      addToCartAPI(cartItem, selectedVariant.id, setCartItemIds, setCart, setAddingToCart); // Add this size to the cart
    }
  }, [checkAuthStatus, product, selectedSize, existingCart, isSizeInCart, cartItemIds, setCartItemIds, setCart, toggleGuestModal]);

  const selectedVariant = product?.sizes?.find((size) => size.size === selectedSize);
  const isSelectedSizeInCart = selectedVariant ? isSizeInCart(selectedVariant.id) : false;

  const handleMouseMove = (e) => {
    const imageContainer = e.currentTarget;
    const rect = imageContainer.getBoundingClientRect();
    const pointerX = ((e.pageX - rect.left) / rect.width) * 100;
    const pointerY = ((e.pageY - rect.top) / rect.height) * 100;
    setZoomPosition({ x: `${pointerX}%`, y: `${pointerY}%` });
    setZoom(true);
  };

  const handleMouseOut = () => {
    setZoom(false); // Disable zoom when the mouse is out
  };

  if (productsLoading) {
    return <LoaderComponent />;
  }

  if (!product) {
    return <LoaderComponent />;
  }

  return (
    <Container fluid className='productDetailContainer'>
      <HeaderCard backgroundColor={'#F5BE49'} color={'#E84325'} name='Product Details' />
      <Container>
        <Row className='g-md-5 m-0 p-0'>
          <Col md={6} className='my-4 p-0 imageColContainer d-flex flex-column align-items-center justify-content-md-start'>
            <Row className='d-flex flex-column-reverse flex-md-row'>
              <Col md={2} className='m-0 p-0'>
              <Row className="d-flex flex-row flex-md-column p-0 m-0 gap-md-2 mx-2 mx-md-0 multiImages overflow-auto">
                {images.map((img, index) => (
                  <Col key={index} xs={3} md={12} className="m-md-0 p-md-0 my-1 my-md-0">
                    <img
                      src={img.url}
                      className="w-100 cursor-pointer"
                      alt={`shirtImage${index}`}
                      onClick={() => setImage(img.url)} // Set clicked image as main image
                      style={{ cursor: 'pointer' }} // To make it clickable
                    />
                  </Col>
                ))}
              </Row>
              </Col>
              <Col md={10} className="d-flex align-items-start justify-content-center m-0 p-0">
                <div className="prdetailCardContainer px-1 py-2">
                  <div
                    className="prdetailImageContainer d-flex align-items-center justify-content-center"
                    style={{
                      '--url': `url(${image})`,
                      '--zoom-x': zoomPosition.x,
                      '--zoom-y': zoomPosition.y,
                      '--display': zoom ? 'block' : 'none',
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseOut={handleMouseOut}
                  >
                    <img src={image} alt="shirtImage" className="img-fluid prshirtImage" />
                  </div>
                </div>
              </Col>
            </Row>
            <Row className='w-100 mt-3'>
              <Col xs={12} className='m-0 p-0'>
              <div className='prOverViewContainer px-3 py-2'>
              <h6 className='prOverViewName m-0 p-0 my-3'>Product Overview</h6>
              <p className='prOverViewInfo m-0 p-0 my-2'>{product?.description}</p>
              <h6 className='prOverViewName mt-3'>Wash Care</h6>
              <ul className='bulletPoints'>
                <li className='prOverViewInfo'>{product?.washcare}</li>
              </ul>
              <h6 className='prOverViewName mt-3'>Material</h6>
              <ul className='prOverViewInfo'>
                <li>{product?.material}</li>
              </ul>
            </div>
              </Col>
            </Row>
          </Col>
          <Col md={6} className='my-4 textColContainer d-flex flex-column align-items-start justify-content-md-start'>
            <div className='prInfoCardContainer py-2 ps-2 pe-4'>
              <h4 className='prInfoName'>{product.name}</h4>
              <p className='prInfoPrice'>
                <span className='ogPrice me-3'>{product.ogprice}</span>
                {product.price}
              </p>
              <p className='prInfooff my-1'>{product.discount}</p>
            </div>
            <div className='prInfoYellowContainer py-4 ps-2 pe-4 text-center'>
              <h4 className='limitedText'>Limited Edition</h4>
              <p className='m-0 p-0 my-3 mnText'>One in a MILLION — Be one of the 1000 lucky ones!</p>
              <p className='m-0 p-0 mnText'>Hurry up! Only 100 pieces are up for grabs!</p>
              <div className='reddragonContainer'>
                <Image fluid src={RD} alt='dr' className='drcontainerImage'/>
            </div>
            <div className='redstrContainer'>
                <Image fluid src={RD2} alt='dr' className='strcontainerImage'/>
            </div>
            </div>
            <div className='selectsizetextContainer'>
              <p className='selectsizetext mt-1 text-center text-md-start'>Select Size</p>
              <div className='sizesContainer my-3 d-flex align-items-center justify-content-center justify-content-md-start'>
              {product.sizes && product.sizes.map(size => renderSizeButton(size, selectedSize, setSelectedSize))}

              </div>
            </div>
            <div className='cbbuttonContainer d-flex justify-content-center align-items-center justify-content-md-start my-2'>
              <button
                className='cbButton cartButton'
                onClick={isSelectedSizeInCart ? handleCartClick : toggleCart} // Switch functionality based on cart state
                disabled={addingToCart || removingFromCart}
              >
                {addingToCart && selectedVariant && !isSelectedSizeInCart ? (
                  <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                ) : removingFromCart && selectedVariant && isSelectedSizeInCart ? (
                  <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                ) : isSelectedSizeInCart ? 'Buy Now' : 'Add to Cart'}
              </button>
            </div>
            <div className='sizeCartContainer my-2'>
              <Image fluid src={SC} className='sizecartImage'/>
            </div>
          </Col>
        </Row>
      </Container>
      <GuestModal onAccessTokenUpdate={handleAccessTokenUpdate} /> 
    </Container>
  );
};

export default ProductDetailsCard;