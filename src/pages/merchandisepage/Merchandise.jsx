import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Form, InputGroup , Image} from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import '../../assets/styles/merchstyles.css';
import ProductCard from '../../components/ProductCard';
import PaginationComponent from '../../components/PaginationComponent';
import { useProducts } from '../../contexts/ProductContext';
import { useNavigate } from 'react-router-dom';
import HeaderCard from '../../components/HeaderCard';
import CollectionsTab from '../../components/CollectionsTab';
import LoaderComponent from '../../components/LoaderComponent';
import { FaShoppingCart } from "react-icons/fa";


const Merchandise = () => {
  const navigate = useNavigate();
  const { products, collections, fetchProductsBySlug, activeCategory, setActiveCategory,  loading, productsLoading} = useProducts();
  const [searchTerm, setSearchTerm] = useState(''); 

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleCartClick = useCallback(() => {
    navigate('/merch/products/cart');
  }, [navigate]);

  const handleOrders = useCallback(() => {
    navigate('/merch/orders');
  }, [navigate]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value); // Update search term as the user types
  }, []);

  // Toggle category and fetch products based on the selected category
  const toggleCategory = useCallback((collectionId) => {
    const selectedCollection = collections.find((col) => col.id === collectionId);
    if (selectedCollection) {
      setActiveCategory(collectionId);
      fetchProductsBySlug(selectedCollection.slug); // Fetch products for the selected collection using slug_url
    }
  }, [collections, fetchProductsBySlug, setActiveCategory]);



  
  if (loading || productsLoading) {
    return <LoaderComponent />;
  }


  const textVariants = {
    hidden: {
        opacity: 0,
        x: -100
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 110,
            damping: 4,
            delay: 0.3,
            duration: 1,
        }
    }
};

  return (
    <Container fluid className='merchContainer'>
      <HeaderCard backgroundColor={"#3EA66B"} color={"#F4E003"} name="Merchandise"/>
    {/*<motion.div variants={textVariants} initial='hidden' animate='visible' className='cmSoonContainer d-flex justify-content-center align-items-center my-3'>
        <Image fluid src={CSM} className='csmImage'/>
    </motion.div>*/}
      <Container className='mt-4 mb-3'>

      <Row className='d-flex align-items-center justify-content-between mt-3 searchContainer'>
        <Col xs={8} className='textColContainer'>
          <InputGroup className='txiContainer'>
            <InputGroup.Text className='textgroupcontainer'>
              <FaSearch style={{color: '#F5BE49'}}/>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search"
              aria-label="Search"
              className='searchInput'
              value={searchTerm}
              onChange={handleSearchChange} 
            />
          </InputGroup>
        </Col>
        <Col xs={4} className="button-col-container d-flex justify-content-end gap-2">
         {/* <button className='cbContainer d-flex justify-content-center align-items-center' onClick={handleOrders}>
           <p className='m-0 p-0'>My Orders</p>
          </button>*/}
          <button className='cbContainer d-flex justify-content-center align-items-center' onClick={handleCartClick}>
          <FaShoppingCart  size={20} className='shopping-cart'/>
          </button>
        </Col>
        <Col xs={12} className='mt-4'>
          <CollectionsTab 
          categories={collections}
          toggleCategory={toggleCategory}
          activeCategory={activeCategory}
        />
        </Col>
      </Row>
      </Container>
     <Row className='mt-1'>
        <Col xs={12}>
           <React.Suspense fallback={<LoaderComponent />}>
            <ProductCard products={filteredProducts} />
          </React.Suspense>
        </Col>
      </Row>
    </Container>
  );
}

export default Merchandise;
