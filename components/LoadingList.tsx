import React, { useEffect, useState } from 'react';

interface LoadingListProps {
  onComplete: () => void;
}

const steps = [
  "Checking Passport...",
  "Packing Suitcase...",
  "Printing Boarding Pass...",
  "Flying to Palawan..."
];

const LoadingList: React.FC<LoadingListProps> = ({ onComplete }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= steps.length) {
      setTimeout(onComplete, 800); // Short delay after final step before unmounting
      return;
    }

    const timer = setTimeout(() => {
      setActiveIndex((prev) => prev + 1);
    }, 800); // Time per step

    return () => clearTimeout(timer);
  }, [activeIndex, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-paper text-ink">
       <div className="w-64">
         <h2 className="font-serif text-2xl tracking-widest mb-6 text-center uppercase border-b border-gray-300 pb-2">Itinerary</h2>
         <ul className="space-y-4">
           {steps.map((step, index) => (
             <li key={index} className="flex items-center gap-3">
               <div className={`w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center transition-colors duration-500 ${index < activeIndex ? 'bg-gold border-gold' : 'bg-transparent'}`}>
                  {index < activeIndex && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  )}
               </div>
               <span 
                 className={`font-body text-xl transition-all duration-500 ${
                   index === activeIndex ? 'text-ink scale-105 font-semibold' : 
                   index < activeIndex ? 'text-gray-400 line-through' : 'text-gray-300'
                 }`}
               >
                 {step}
               </span>
             </li>
           ))}
         </ul>
       </div>
    </div>
  );
};

export default LoadingList;