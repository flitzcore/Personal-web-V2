import React from 'react';
import ScrollCarousel from '@/components/ScrollCarousel';
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
         <div className="w-1/2 flex items-center justify-start pl-8">
           <div className="text-left text-white" style={{ 
             zIndex: 1000,
             width: '40vw',
             maxWidth: '600px'
           }}>
            {/* Text at top left */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium mb-2 sm:mb-4">Hi, I'm a</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold mb-2 sm:mb-4" style={{ 
                fontFamily: 'Google Sans Code, monospace' 
              }}>Programmer</h1>
            </div>
            
             {/* Scroll-based Project Carousel */}
             <ScrollCarousel 
               className="w-full h-30vh min-h-200px max-h-400px" 
               spotlightColor="rgba(61, 18, 134, 0.73)"
               dummyPageCount={3}
               carouselConfigs={[
                 {
                   jsonPath: "/datas/dev.json",
                   title: 'I create <span class="font-bold">mobile and web app</span>'
                 },
                 {
                   jsonPath: "/datas/dev2.json",
                   title: 'I build <span class="font-bold">innovative solutions</span>'
                 },
                 {
                   jsonPath: "/datas/dev3.json",
                   title: 'I develop <span class="font-bold">cutting-edge technology</span>'
                 }
               ]}
             />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Page1;
