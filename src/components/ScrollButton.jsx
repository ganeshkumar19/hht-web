import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import '../assets/styles/scrollButtonStyles.css';

const ScrollButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [atBottom, setAtBottom] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }

        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            setAtBottom(true);
        } else {
            setAtBottom(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        isVisible && (
            <div className='scrollButtonContainer'>
                {atBottom ? (
                    <FaArrowUp onClick={scrollToTop} className="scrollIcon" />
                ) : (
                    <FaArrowDown onClick={scrollToBottom} className="scrollIcon" />
                )}
            </div>
        )
    );
};

export default ScrollButton;
