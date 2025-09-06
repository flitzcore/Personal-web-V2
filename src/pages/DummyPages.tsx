import React from 'react';

interface DummyPagesProps {
  count: number;
}

const DummyPages: React.FC<DummyPagesProps> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <section key={index} className="h-screen bg-white flex items-center justify-center">
          <div className="text-center text-gray-800">
            <h1 className="text-6xl font-bold mb-4">Dummy Page {index + 1}</h1>
            <p className="text-xl">This is dummy content for scrolling</p>
          </div>
        </section>
      ))}
    </>
  );
};

export default DummyPages;
