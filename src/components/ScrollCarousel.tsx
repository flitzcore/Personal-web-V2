import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import TypingText from './TypingText';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
}

interface ScrollCarouselProps {
  className?: string;
  spotlightColor?: string;
  jsonPath: string;
  dummyPageCount: number;
}

const ScrollCarousel: React.FC<ScrollCarouselProps> = ({
  className = "",
  spotlightColor = "rgba(61, 18, 134, 0.73)",
  jsonPath,
  dummyPageCount
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentDummyPage, setCurrentDummyPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Function to scroll to Page4 (starts at offset 10)
  const scrollToPage4 = () => {
    const page4Offset = 10; // Page4 starts after 9 dummy pages
    const windowHeight = window.innerHeight;
    const targetScrollPosition = page4Offset * windowHeight;
    
    window.scrollTo({
      top: targetScrollPosition,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // Load projects data
    fetch(jsonPath)
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading projects:', error);
        setIsLoading(false);
      });
  }, [jsonPath]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which dummy page we're currently on
      const newDummyPage = Math.floor(scrollTop / windowHeight);
      
      // Clamp to valid range
      const clampedPage = Math.max(0, Math.min(newDummyPage, dummyPageCount - 1));
      
      setCurrentDummyPage(clampedPage);
    };

    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dummyPageCount]);

  if (isLoading) {
    return (
      <SpotlightCard 
        className={`w-full h-30vh min-h-200px max-h-400px ${className} cursor-pointer hover:opacity-90 transition-opacity duration-200`} 
        spotlightColor={spotlightColor}
        onClick={scrollToPage4}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-white">Loading projects...</div>
        </div>
      </SpotlightCard>
    );
  }

  if (projects.length === 0) {
    return (
      <SpotlightCard 
        className={`w-full h-30vh min-h-200px max-h-400px ${className} cursor-pointer hover:opacity-90 transition-opacity duration-200`} 
        spotlightColor={spotlightColor}
        onClick={scrollToPage4}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-white">No projects available</div>
        </div>
      </SpotlightCard>
    );
  }

  // Calculate which project to show based on dummy page
  const currentProjectIndex = currentDummyPage % projects.length;
  const currentProject = projects[currentProjectIndex];

  return (
    <SpotlightCard 
      className={`w-full h-30vh min-h-200px max-h-400px ${className} cursor-pointer hover:opacity-90 transition-opacity duration-200`} 
      spotlightColor={spotlightColor}
      onClick={scrollToPage4}
    >
      <div className="flex flex-col h-full">
        {/* Dynamic Project Title with Typing Animation */}
        <AnimatePresence mode="wait">
          <motion.h3 
            key={currentProjectIndex}
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mb-2 sm:mb-3 flex-shrink-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeInOut"
            }}
          >
            <TypingText 
              text={currentProject.title}
              speed={80}
              delay={200}
            />
          </motion.h3>
        </AnimatePresence>

        {/* Project Image with Dots */}
        <div className="flex-shrink-0 mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentProjectIndex}
                src={currentProject.image} 
                alt="Project showcase"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeInOut",
                  opacity: { duration: 0.3 }
                }}
                onError={(e) => {
                  // Fallback to placeholder if image doesn't exist
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                }}
              />
            </AnimatePresence>
          </div>
          
          {/* Page Dots - Right side of image */}
          <div className="flex flex-col space-y-1 sm:space-y-1.5">
            {Array.from({ length: dummyPageCount }, (_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-200 ${
                  index === currentDummyPage ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Project Description with Typing Animation */}
        <AnimatePresence mode="wait">
          <motion.p 
            key={currentProjectIndex}
            className="text-white/80 text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg leading-relaxed flex-grow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeInOut"
            }}
          >
            <TypingText 
              text={currentProject.description}
              speed={30}
              delay={600}
            />
          </motion.p>
        </AnimatePresence>

        {/* Tech Stack Tags with Animation */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentProjectIndex}
            className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2 flex-shrink-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeInOut",
              delay: 0.1
            }}
          >
            {currentProject.techStack.map((tech, index) => (
              <motion.span 
                key={index}
                className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.2, 
                  delay: 0.2 + (index * 0.05),
                  ease: "easeOut"
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </SpotlightCard>
  );
};

export default ScrollCarousel;
