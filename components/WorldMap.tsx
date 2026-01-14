import React from 'react';

const WorldMap: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 z-0 opacity-[0.15] pointer-events-none overflow-hidden flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 600 1000"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover md:object-contain text-taupe fill-current transform scale-110 md:scale-95 origin-center"
        preserveAspectRatio="xMidYMid meet"
      >
        <title>Philippines Map</title>
        <g id="Philippines-Map">
            {/* Luzon Group */}
            <path d="M220,40 C240,20 320,10 340,30 C360,50 380,80 370,120 C360,150 390,180 410,210 C420,240 400,280 350,300 C320,310 280,300 250,280 C230,260 200,250 190,200 C180,150 190,120 200,100 C210,80 200,60 220,40 Z M350,280 C360,285 370,290 360,300 C350,310 340,300 335,290 C330,280 340,275 350,280 Z" />
            
            {/* Palawan */}
            <path d="M120,400 C140,380 160,350 170,330 C180,310 200,290 210,310 C220,330 200,360 180,390 C160,420 130,480 110,500 C90,520 70,510 60,490 C50,470 80,440 100,420 C110,410 115,405 120,400 Z" />
            
            {/* Visayas Group */}
            <path d="M280,350 C300,340 320,345 330,360 C340,375 330,390 320,400 C310,410 300,405 290,395 C280,385 270,360 280,350 Z" /> {/* Panay/Negros approx */}
            <path d="M350,330 C370,320 390,330 400,350 C410,370 400,400 380,410 C360,420 340,400 350,380 C355,370 345,340 350,330 Z" /> {/* Cebu/Bohol approx */}
            <path d="M420,310 C440,300 460,320 450,350 C440,380 430,360 420,340 C410,330 415,315 420,310 Z" /> {/* Samar/Leyte approx */}
            
            {/* Mindanao Group */}
            <path d="M300,550 C330,530 380,520 420,540 C460,560 480,600 470,650 C460,700 440,750 400,780 C360,810 300,800 260,750 C220,700 200,650 220,600 C240,550 270,560 300,550 Z M240,680 C230,690 220,680 230,670 C240,660 250,670 240,680 Z" />
            
            {/* Sulu Archipelago */}
            <path d="M180,720 C190,710 200,720 190,730 C180,740 170,730 180,720 Z M150,750 C160,740 170,750 160,760 C150,770 140,760 150,750 Z" />
        </g>
        
        {/* Decorative Compass/Lines */}
        <g className="opacity-20 stroke-current" fill="none" strokeWidth="1">
           <circle cx="500" cy="150" r="40" strokeDasharray="4,4" />
           <path d="M500,110 L500,190 M460,150 L540,150" />
           <path d="M100,800 L200,900" />
        </g>
      </svg>
    </div>
  );
};

export default WorldMap;