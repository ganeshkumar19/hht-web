
import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import '../assets/styles/faqstyles.css';  // Make sure your styles match the design in the image

const FaqContainerComponent = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close if the same index is clicked again
    } else {
      setOpenIndex(index); // Open the clicked FAQ
    }
  };

  return (
    <div className="faq-container">
      <p className='FaqHeading'>FAQ</p>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleFaq(index)}>
            {faq.question}
            {openIndex === index ? <BsChevronUp className="float-right" /> : <BsChevronDown className="float-right" />}
          </div>
          {openIndex === index && (
            <div className="faq-answer">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqContainerComponent;
