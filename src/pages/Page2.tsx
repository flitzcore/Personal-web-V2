import React from 'react';

const Page2: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-blue-500">
      <div className="text-center text-white" style={{ 
        position: 'absolute',
        top: '50vh', 
        left: '50vw', 
        transform: 'translate(-50%, -50%)',
        zIndex: 1000
      }}>
        <h1 className="text-6xl font-bold mb-4">Page 2</h1>
        <p className="text-xl">This is the second layered page</p>
        <p className="text-lg mt-4">Scroll through 3 dummy pages to see the transition</p>
      </div>
    </div>
  );
};

export default Page2;
