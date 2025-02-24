import React from 'react'
import '../assets/styles/collectiontabstyles.css'
import { Spinner } from 'react-bootstrap'


const CollectionsTab = ({ categories=[], toggleCategory, activeCategory }) => {
    return (
      <div className="category-container gap-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-box ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => toggleCategory(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
    );
  };
  
  export default CollectionsTab;