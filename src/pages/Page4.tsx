import React, { useRef, useState, useEffect } from "react";

const Page4: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>(
    []
  );
  const [paths, setPaths] = useState<{ x: number; y: number }[][]>([]);

  // Drawing constants
  const BRUSH_SIZE = 3;
  const BRUSH_COLOR = "#000000";
  const BRUSH_OPACITY = 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match the container
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw all paths
    paths.forEach((path) => {
      if (path.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);

      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }

      ctx.strokeStyle = BRUSH_COLOR;
      ctx.lineWidth = BRUSH_SIZE;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalAlpha = BRUSH_OPACITY;
      ctx.stroke();
    });

    // Draw current path
    if (currentPath.length >= 2) {
      ctx.beginPath();
      ctx.moveTo(currentPath[0].x, currentPath[0].y);

      for (let i = 1; i < currentPath.length; i++) {
        ctx.lineTo(currentPath[i].x, currentPath[i].y);
      }

      ctx.strokeStyle = BRUSH_COLOR;
      ctx.lineWidth = BRUSH_SIZE;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalAlpha = BRUSH_OPACITY;
      ctx.stroke();
    }
  }, [paths, currentPath]);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const pos = getMousePos(e);
    setCurrentPath([pos]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const pos = getMousePos(e);
    setCurrentPath((prev) => [...prev, pos]);
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;

    setIsDrawing(false);
    if (currentPath.length > 0) {
      setPaths((prev) => [...prev, currentPath]);
    }
    setCurrentPath([]);
  };

  const handleMouseLeave = () => {
    if (isDrawing) {
      handleMouseUp();
    }
  };

  return (
    <div className="absolute inset-0 bg-white">
      <div className="flex h-full">
        {/* Left side - Image */}
        <div className="w-1/2 h-screen flex items-center  p-0 m-0">
          <img
            src="/images/page4.jpg"
            alt="Page 4"
            className="h-full w-auto object-cover m-0 p-0"
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
            <div className="mb-4 sm:mb-6 md:mb-8" style={{ zIndex: 1000 }}>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium mb-2 sm:mb-4">
                Hi,...You've come this far, might as well
              </p>
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold mb-2 sm:mb-4"
                style={{
                  fontFamily: "Google Sans Code, monospace",
                }}
              >
                Contact Me
              </h1>
            </div>

            {/* Contact Icons and Doodle Text */}
            <div
              className="w-full bg-transparent flex-shrink-0 flex flex-col items-center justify-center"
              style={{
                height: "30vh",
                minHeight: "200px",
                maxHeight: "400px",
                display: "block",
              }}
            >
              {/* Icon Buttons Row */}
              <div className="flex gap-4 mb-4" style={{ zIndex: 1000 }}>
                {/* Gmail Button */}
                <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819c.904 0 1.636.732 1.636 1.636z" />
                  </svg>
                </button>

                {/* LinkedIn Button */}
                <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </div>

              {/* Doodle Text */}
              <p
                className="text-black text-md font-thin text-right"
                style={{ zIndex: 1 }}
              >
                **you can doodle here while waiting
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Drawing Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        style={{
          zIndex: 500,
          pointerEvents: "auto",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default Page4;
