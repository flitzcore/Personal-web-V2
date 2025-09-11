import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
}

interface WindowedCarouselProps {
  className?: string;
  spotlightColor?: string;
  jsonPath: string;
  dummyPageCount: number;
}

const WindowedCarousel: React.FC<WindowedCarouselProps> = ({
  className = "",
  jsonPath,
  dummyPageCount,
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
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Load projects data
    fetch(jsonPath)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading projects:", error);
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
      const clampedPage = Math.max(
        0,
        Math.min(newDummyPage, dummyPageCount - 1)
      );

      setCurrentDummyPage(clampedPage);
    };

    window.addEventListener("scroll", handleScroll);
    // Call once to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [dummyPageCount]);

  if (isLoading) {
    return (
      <div className={`w-full h-30vh min-h-200px max-h-400px ${className}`}>
        <div className="w-full h-full bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
          {/* MacBook Browser Header */}
          <div className="bg-gray-200 px-3 py-2 flex items-center gap-2 border-b border-gray-300">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500 ml-4">
              Loading projects...
            </div>
          </div>
          <div className="p-4 flex items-center justify-center h-full">
            <div className="text-gray-600">Loading projects...</div>
          </div>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className={`w-full h-30vh min-h-200px max-h-400px ${className}`}>
        <div className="w-full h-full bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
          {/* MacBook Browser Header */}
          <div className="bg-gray-200 px-3 py-2 flex items-center gap-2 border-b border-gray-300">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500 ml-4">
              No projects available
            </div>
          </div>
          <div className="p-4 flex items-center justify-center h-full">
            <div className="text-gray-600">No projects available</div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate which project to show based on dummy page
  const currentProjectIndex = currentDummyPage % projects.length;
  const currentProject = projects[currentProjectIndex];

  return (
    <div className={`w-full h-30vh min-h-200px max-h-400px ${className}`}>
      <div
        className="w-full h-full bg-gray-100 rounded-lg border border-gray-300 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200"
        onClick={scrollToPage4}
      >
        {/* MacBook Browser Header */}
        <div className="bg-gray-200 px-3 py-2 flex items-center gap-2 border-b border-gray-300">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 bg-white rounded px-3 py-1 text-sm font-medium text-gray-700 ml-4">
            {currentProject.title}
          </div>
        </div>

        {/* Browser Content */}
        <div className="p-4 h-full flex flex-col">
          {/* Project Image with Dots */}
          <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3 h-full">
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
                    ease: "easeOut",
                    opacity: { duration: 0.3 },
                  }}
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.currentTarget.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==";
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
                    index === currentDummyPage ? "bg-gray-600" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowedCarousel;
