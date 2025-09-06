import React, { useEffect, useState } from 'react';

interface LayeredPageProps {
  children: React.ReactNode;
  dummyPageCount: number;
  zIndex: number;
  backgroundColor: string;
  pageNumber: number;
  startOffset: number; // Where this layer starts in the scroll
}

const LayeredPage: React.FC<LayeredPageProps> = ({ 
  children, 
  dummyPageCount, 
  zIndex, 
  backgroundColor,
  pageNumber,
  startOffset
}) => {
  const [height, setHeight] = useState('100vh');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which dummy page we're currently on globally
      const currentGlobalPage = Math.floor(scrollTop / windowHeight);
      
      // Calculate the start of this layer's shrinking phase
      const shrinkStartPage = startOffset + dummyPageCount - 1;
      
      // If we haven't reached the shrinking phase yet, show full height
      if (currentGlobalPage < shrinkStartPage) {
        setHeight('100vh');
        return;
      }
      
      // If we're in the shrinking phase (last dummy page of this layer)
      if (currentGlobalPage === shrinkStartPage) {
        const progressInLastPage = (scrollTop % windowHeight) / windowHeight;
        const newHeight = (1 - progressInLastPage) * 100;
        setHeight(`${Math.max(0, newHeight)}vh`);
        return;
      }
      
      // If we've scrolled past this layer's shrinking phase, hide it completely
      if (currentGlobalPage > shrinkStartPage) {
        setHeight('0vh');
        return;
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dummyPageCount, startOffset]);

  return (
    <div
      className="fixed top-0 left-0 w-full overflow-hidden"
      style={{
        height,
        zIndex,
        backgroundColor,
        transition: 'none' // Remove transition to prevent rebounding
      }}
    >
      <div className="absolute w-full h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default LayeredPage;
