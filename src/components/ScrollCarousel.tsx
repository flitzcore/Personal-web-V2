import React, { useState, useEffect } from 'react';
import ProjectCarousel from './ProjectCarousel';

interface ScrollCarouselProps {
  className?: string;
  spotlightColor?: string;
  carouselConfigs: Array<{
    jsonPath: string;
    title: string;
  }>;
  dummyPageCount: number;
}

const ScrollCarousel: React.FC<ScrollCarouselProps> = ({
  className = "",
  spotlightColor = "rgba(61, 18, 134, 0.73)",
  carouselConfigs,
  dummyPageCount
}) => {
  const [currentDummyPage, setCurrentDummyPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which dummy page we're currently on
      const newDummyPage = Math.floor(scrollTop / windowHeight);
      
      // Clamp to valid range
      const clampedPage = Math.max(0, Math.min(newDummyPage, dummyPageCount - 1));
      
      if (clampedPage !== currentDummyPage) {
        setIsTransitioning(true);
        setCurrentDummyPage(clampedPage);
        
        // Reset transition state after animation
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentDummyPage, dummyPageCount]);

  // Get current carousel config (cycle through if more dummy pages than configs)
  const currentConfig = carouselConfigs[currentDummyPage % carouselConfigs.length];

  return (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'} ${className}`}>
      <ProjectCarousel
        className="w-full h-30vh min-h-200px max-h-400px"
        spotlightColor={spotlightColor}
        jsonPath={currentConfig.jsonPath}
        title={currentConfig.title}
      />
    </div>
  );
};

export default ScrollCarousel;
