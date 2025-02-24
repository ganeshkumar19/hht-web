import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import '../assets/styles/prcardstyles.css';
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import SHIRT1 from '../assets/images/shirt3.png'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  const MotionContainer = motion(Container);
  

  const handleProductClick = (productId) => {
    navigate(`/merch/product/${productId}`); // Navigate to product details route
  };
  return (
    <MotionContainer>
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={6} md={4} lg={3} className="prCardCol">
              <motion.div
              className='prCardContainer p-2' 
              onClick={() => handleProductClick(product.id)}>
              <div className='prImageContainer'>
                <LazyLoadImage src={product.images && product.images.length > 0 ? product.images[0].url : SHIRT1} alt='shirtImage' className='shirtImage' effect="blur"  placeholderSrc={SHIRT1}/>
              </div>
              <div className='prDetailsContainer my-2'>
                <h4 className='prName'>{product.name}</h4>
                <p className='prPrice'><span className='ogfrontPrice me-2'>{product.ogprice}</span>{product.price}</p>
                <p className='proff'>{product.discount}</p>
              </div>
            </motion.div>

          </Col>
        ))}
      </Row>
    </MotionContainer>
  
  );
};

export default ProductCard;
