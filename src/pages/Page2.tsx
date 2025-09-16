import React from "react";
import WindowedCarousel from "@/components/WindowedCarousel";

const Page2: React.FC = () => {
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400;1,700&family=DM+Serif+Display:ital@0;1&family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&display=swap"
        rel="stylesheet"
      />
      <div className="absolute inset-0 bg-white">
        <div className="flex h-screen">
          {/* Left side - Image */}

          <div className="w-1/2 h-screen flex items-center  p-0 m-0">
            <img
              src="/images/page2.jpg"
              alt="Page 2"
              className="h-screen w-auto object-cover m-0 p-0"
              style={{ margin: 0, padding: 0 }}
            />
          </div>

          {/* Right side - Content */}
          <div className="w-1/2 flex items-center justify-start pl-8">
            <div
              className="text-left text-black"
              style={{
                zIndex: 1000,
                width: "40vw",
                maxWidth: "600px",
              }}
            >
              {/* Text at top left */}
              <div className="mb-4 sm:mb-6 md:mb-8">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium mb-2 sm:mb-4 tracking-wide">
                  Hi, I'm a
                </p>
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold mb-2 sm:mb-4 tracking-wider"
                  style={{
                    fontFamily: "DM Serif Display",
                  }}
                >
                  Designer
                </h1>
              </div>

              {/* Windowed Project Carousel */}
              <WindowedCarousel
                className="w-full h-30vh min-h-200px max-h-400px"
                spotlightColor="rgba(61, 18, 134, 0.73)"
                jsonPath="/datas/art.json"
                dummyPageCount={3}
                startFromFirst={true}
                startOffset={5}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;
