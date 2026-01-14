import React from 'react';

const PlaneTrail: React.FC = () => {
  // Path follows the vertical archipelago of the Philippines
  // Starts top right (Pacific), loops around Luzon, cuts through Visayas, loops Palawan, exits towards Mindanao
  const pathData = "M 500,50 C 400,100 200,50 250,200 C 300,350 450,300 400,400 C 350,500 150,350 150,450 C 150,550 300,600 350,700 C 400,800 500,850 600,900";
  const duration = 8; // Seconds for one full journey

  return (
    <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
      <svg 
        viewBox="0 0 600 1000" 
        className="w-full h-full opacity-60"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
           <mask id="trailMask">
             <path 
               d={pathData} 
               fill="none" 
               stroke="white" 
               strokeWidth="8" 
               strokeDasharray="3000"
               strokeDashoffset="3000"
             >
               <animate 
                 attributeName="stroke-dashoffset" 
                 from="3000" 
                 to="0" 
                 dur={`${duration}s`} 
                 repeatCount="indefinite"
                 calcMode="linear"
               />
             </path>
           </mask>

           <filter id="pencil" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" noiseInput="SourceGraphic" numOctaves="3" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>

        <path
          d={pathData}
          fill="none"
          stroke="#555"
          strokeWidth="2"
          strokeDasharray="8, 10" 
          strokeLinecap="round"
          filter="url(#pencil)"
          mask="url(#trailMask)"
        />

        <g>
            {/* Plane Icon */}
            <path
              d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
              fill="#333"
              transform="scale(1.5) rotate(90, 10.5, 12) translate(-10.5, -12)"
            >
            </path>
            
            <animateMotion
              dur={`${duration}s`}
              repeatCount="indefinite"
              rotate="auto"
              path={pathData}
              calcMode="paced" 
            />
        </g>
      </svg>
    </div>
  );
};

export default PlaneTrail;