import React, { useState, useEffect } from 'react';
import SpotlightCard from '@/components/SpotlightCard';

interface Project {
  id: number;
  description: string;
  image: string;
  techStack: string[];
}

interface ProjectCarouselProps {
  className?: string;
  spotlightColor?: string;
  jsonPath: string;
  title: string;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ 
  className = "", 
  spotlightColor = "rgba(61, 18, 134, 0.73)",
  jsonPath,
  title
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (isLoading) {
    return (
      <SpotlightCard className={`w-full h-30vh min-h-200px max-h-400px ${className}`} spotlightColor={spotlightColor}>
        <div className="flex items-center justify-center h-full">
          <div className="text-white">Loading projects...</div>
        </div>
      </SpotlightCard>
    );
  }

  if (projects.length === 0) {
    return (
      <SpotlightCard className={`w-full h-30vh min-h-200px max-h-400px ${className}`} spotlightColor={spotlightColor}>
        <div className="flex items-center justify-center h-full">
          <div className="text-white">No projects available</div>
        </div>
      </SpotlightCard>
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <SpotlightCard className={`w-full h-30vh min-h-200px max-h-400px ${className}`} spotlightColor={spotlightColor}>
      <div className="flex flex-col h-full">
        {/* Dynamic Title */}
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mb-2 sm:mb-3 flex-shrink-0">
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </h3>

        {/* Project Image */}
        <div className="flex-shrink-0 mb-2 sm:mb-3">
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            <img 
              src={currentProject.image} 
              alt="Project showcase"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to placeholder if image doesn't exist
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
              }}
            />
          </div>
        </div>

        {/* Project Description */}
        <p className="text-white/80 text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg leading-relaxed flex-grow">
          {currentProject.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2 flex-shrink-0">
          {currentProject.techStack.map((tech, index) => (
            <span 
              key={index}
              className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-2 sm:mt-3 pt-2 border-t border-white/20">
          <button
            onClick={prevProject}
            className="text-white/60 hover:text-white transition-colors duration-200 text-lg sm:text-xl lg:text-2xl font-bold"
          >
            &lt;
          </button>
          
          <div className="flex space-x-1 sm:space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextProject}
            className="text-white/60 hover:text-white transition-colors duration-200 text-lg sm:text-xl lg:text-2xl font-bold"
          >
            &gt;
          </button>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default ProjectCarousel;
