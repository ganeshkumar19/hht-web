import React from 'react';
import { Image } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // Correctly import modules
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../assets/styles/prcardstyles.css';
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const ProductSwiperCard = ({ products }) => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: 85,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.4,
        duration: 0.5,
      },
    },
  };

  const handleProductClick = (productId) => {
    navigate(`/merch/product/${productId}`);
  };

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={10}
      slidesPerView={2}
      pagination={{ clickable: true }}
      breakpoints={{
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
      className="myproductSwiper p-3"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id} className="prCardCol">
          <InView threshold={0.2} triggerOnce={true}>
            {({ ref, inView }) => (
              <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="prCardContainer p-2"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="prImageContainer">
                  <Image fluid src={product.image} alt="shirtImage" className="shirtImage" />
                </div>
                <div className="prDetailsContainer my-2">
                  <h4 className="prName">{product.name}</h4>
                  <p className="prPrice">{product.price}</p>
                  <p className="proff">{product.discount}</p>
                </div>
              </motion.div>
            )}
          </InView>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSwiperCard;