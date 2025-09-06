import React from 'react';
import SpotlightCard from '@/components/SpotlightCard';
const Page1: React.FC = () => {
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
      
      <div className="absolute inset-0 bg-black">
        <div className="flex h-screen">
        {/* Left side - Image */}
        <div className="w-1/2 h-screen flex items-center p-0 m-0">
          <img 
            src="/images/page1.jpg" 
            alt="Page 1" 
            className="h-screen w-auto object-cover m-0 p-0"
            style={{ margin: 0, padding: 0 }}
          />
        </div>
        
        {/* Right side - Content */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="text-left text-white" style={{ 
            position: 'absolute',
            top: '50vh', 
            left: '75vw', 
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            width: '40vw',
            maxWidth: '600px'
          }}>
            {/* Text at top left */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium mb-2 sm:mb-4">Hi, I'm a</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-extrabold mb-2 sm:mb-4" style={{ 
                fontFamily: 'Google Sans Code, monospace' 
              }}>Programmer</h1>
            </div>
            
            {/* Spotlight card below */}
            <SpotlightCard className="w-full h-30vh min-h-200px max-h-400px" spotlightColor="rgba(61, 18, 134, 0.73)">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-3 sm:mb-4">Featured Work</h3>
              <p className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                Here you can showcase your projects, skills, or any other content you'd like to highlight. 
                The spotlight effect creates an interactive, modern look that follows your cursor.
              </p>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs sm:text-sm">React</span>
                <span className="px-2 py-1 sm:px-3 sm:py-1 bg-green-500/20 text-green-300 rounded-full text-xs sm:text-sm">TypeScript</span>
                <span className="px-2 py-1 sm:px-3 sm:py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs sm:text-sm">Tailwind</span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Page1;
