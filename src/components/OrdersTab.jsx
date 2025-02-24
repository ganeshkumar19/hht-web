import React from 'react';
import '../assets/styles/orderstabstyles.css';
import { Spinner } from 'react-bootstrap';

const OrdersTab = ({ orders = [], toggleCategory, activeCategory }) => {
  return (
    <div className="ordertab-container gap-3 ms-md-4 mt-md-2">
      {orders.map((category) => (
        <div
          key={category.id}
          className={`ordertab-box ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => toggleCategory(category.id)}  
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default OrdersTab;
