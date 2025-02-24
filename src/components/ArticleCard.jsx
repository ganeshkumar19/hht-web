import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../assets/styles/articleswiperstyles.css'
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ArticleCard = ({ articles, onReachEnd }) => {
  return (
       <>
        <Swiper
            slidesPerView={1} // Default number of slides per view
            spaceBetween={30} // Space between slides
            pagination={{
            clickable: true,
            }}
            onReachEnd={onReachEnd}
            modules={[Pagination]} // Ensure Pagination is correctly set
            className="articlesSwiper my-3"
            breakpoints={{
            // when window width is >= 576px
            576: {
                slidesPerView: 2,
                spaceBetween: 10
        
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 2,
            }
            }}
        >

       {articles.map(article => (
        <SwiperSlide key={article.id} className='articlesSwiperSlider'>
          <h2 className='artsliderheading mb-4'>{article.title}</h2>
          <p className='artslidertext'>{article.content}</p>
        </SwiperSlide>
      ))}
      
      </Swiper>
      </>
  );
}

export default ArticleCard;