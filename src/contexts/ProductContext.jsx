import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import SHIRT from '../assets/images/shirt.png';
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye';
import axios from 'axios';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [productsLoading, setProductsLoading] = useState(false)
  const [error, setError] = useState(null);
   
  const fetchCollections = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/merchant/collection/all/100/0`);
      const result = response.data;
      if (result.status === 'success') {
        const collectionsData = result.data.map((collection) => ({
          id: collection.ID,
          name: collection.name,
          slug: collection.slug_url,
        }));
        setCollections(collectionsData);
        if (collectionsData.length > 0) {
          setActiveCategory(collectionsData[0].id);
          fetchProductsBySlug(collectionsData[0].slug);
        }
      } else {
        throw new Error('Failed to fetch collections');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsBySlug = useCallback(async (slug) => {
    setProductsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/merchant/product/collection/${slug}/latest/100/0`);
      const result = response.data;
      if (result.status === 'success') {
        const productsData = result.data.map((product) => ({
          id: product.ID,
          name: product.name,
          price: `₹${product.selling_price}`,
          ogprice: `₹${product.base_price}`,
          discount: `${product.discount}% off`,
          washcare: `${product.wash_care}`,
          material: `${product.material}`,
          images: product.images.map((image) => ({
            id: image.ID,           // Storing the image ID
            url: image.image_url,    // Storing the image URL
            index: image.image_idx   // Storing the image index
          })),
          sizes: product.product_variants.map((variant) => ({
            id: variant.ID,         // Store variant ID
            size: variant.variant_size,
            productQuantity: variant.quantity // Store variant size
          })),
          selectedSize: '',
          quantity: product.product_variants.reduce((acc, variant) => acc + variant.quantity, 0),
          description: product.description,
          collectionId: product.ID,
        }));
        setProducts(productsData);
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, []);




  return (
    <ProductsContext.Provider value={{ products, collections, fetchProductsBySlug, loading, productsLoading, activeCategory, setActiveCategory }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
