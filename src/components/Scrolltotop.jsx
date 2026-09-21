import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show arrow when user reaches footer (80% down page)
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setShowArrow(scrollPercent > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    showArrow && (
      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
      </button>
    )
  );
}