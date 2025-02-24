import React from 'react'
import '../assets/styles/addresscategorytabstyles.css'
import homeIcon from '../assets/images/Home.png';  // Change the path accordingly
import workIcon from '../assets/images/work.png';  // Change the path accordingly
import otherIcon from '../assets/images/others.png';  // Change the path accordingly



const AddressCategoryTab = ({ categories, toggleCategory, activeCategory }) => {

    const getCategoryIcon = (category) => {
        switch (category) {
          case 'Home':
            return homeIcon;
          case 'Work':
            return workIcon;
          case 'Others':
            return otherIcon;
          default:
            return null;
        }
      };

    return (
      <>
            <p className="m-0 p-0 mx-2 saveAsText">Save As</p>
      <div className="ac-container gap-4">
      <div className='d-flex  d-flex justify-content-center align-items-center gap-4 ac-container-tab'>
      {categories.map((category) => (
        <div
          key={category.id}
          className={`ac-box d-flex justify-content-center align-items-center gap-2 ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => toggleCategory(category.id)}
        >
          <img src={getCategoryIcon(category.name)} alt={`${category.name} icon`} className="category-icon" />
          <span>{category.name}</span>
        </div>
      ))}
    </div>
    </div>
    </>
    );
  };
  
  export default AddressCategoryTab;