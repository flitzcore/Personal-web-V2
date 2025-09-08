import React from 'react';

const Page2: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-white">
      <div className="flex h-full">
        {/* Left side - Image */}
        <div className="w-1/2 h-screen flex items-center  p-0 m-0">
          <img 
            src="/images/page2.jpg" 
            alt="Page 2" 
            className="h-full w-auto object-cover m-0 p-0"
            style={{ margin: 0, padding: 0 }}
          />
        </div>
        
        {/* Right side - Content */}
        <div className="w-1/2 flex items-center justify-start pl-8">
          <div className="text-left text-black" style={{ 
            zIndex: 1000,
            width: '40vw',
            maxWidth: '600px'
          }}>
            <h1 className="text-6xl font-bold mb-4">Page 2</h1>
            <p className="text-xl">This is the second layered page</p>
            <p className="text-lg mt-4">Scroll through 3 dummy pages to see transition</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;
