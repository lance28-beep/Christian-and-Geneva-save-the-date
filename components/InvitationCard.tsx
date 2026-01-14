import React from 'react';
import { InvitationDetails } from '../types';
import PlaneTrail from './PlaneTrail';
import { Users } from 'lucide-react';

interface Props {
  details: InvitationDetails;
  onRSVP: () => void;
  guestCount: number | null;
  onViewGuestBook: () => void;
}

const InvitationCard: React.FC<Props> = ({ details, onRSVP, guestCount, onViewGuestBook }) => {
  return (
    <div className="relative w-full h-full mx-auto flex flex-col justify-between sm:justify-center items-center text-ink px-2 md:px-4 lg:px-6">
      
      {/* Container for SVG Overlay - constrained to relative parent */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
         <PlaneTrail />
      </div>

      {/* Top Section: Location Stamp - Enhanced for Desktop */}
      <div 
        className="absolute top-0 right-0 sm:right-auto sm:top-8 sm:left-8 lg:top-12 lg:left-12 xl:top-16 xl:left-16 animate-fade-in-up z-10 scale-75 sm:scale-100 lg:scale-110 origin-top-right sm:origin-center transition-all duration-500 hover:scale-90 sm:hover:scale-110 lg:hover:scale-125 hover:-rotate-6 cursor-pointer group/stamp" 
        style={{ animationDelay: '0.1s' }}
      >
        <div className="border-2 border-gray-300 rounded-full p-3 sm:p-4 lg:p-5 xl:p-6 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex items-center justify-center -rotate-12 opacity-80 shadow-lg shadow-gray-200/50 bg-gradient-to-br from-paper via-paper/90 to-taupe/30 backdrop-blur-sm transition-all duration-500 hover:bg-gradient-to-br hover:from-paper hover:via-gold/10 hover:to-taupe/40 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/20 hover:opacity-100">
             <div className="text-center pointer-events-none transition-transform duration-500 group-hover/stamp:scale-110">
                 <p className="font-serif text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-widest text-gray-600 group-hover/stamp:text-gold transition-colors duration-300">Est.</p>
                 <p className="font-serif text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-ink group-hover/stamp:text-ink transition-all duration-300">2027</p>
                 <p className="font-serif text-[7px] sm:text-[8px] lg:text-[9px] uppercase tracking-widest text-gray-600 group-hover/stamp:text-gold transition-colors duration-300">Philippines</p>
             </div>
        </div>
      </div>

      {/* Main Content Group - Enhanced spacing for desktop */}
      <div className="flex-grow flex flex-col justify-center items-center w-full z-20 mt-4 sm:mt-0 lg:mt-0">
        
        {/* SAVE THE DATE - Image replacement */}
        <div className="flex flex-col items-center leading-none scale-90 sm:scale-100 lg:scale-105 xl:scale-110 origin-bottom group cursor-default animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <img 
            src="/image/savethedate.png" 
            alt="Save the Date" 
            className="w-auto h-auto max-w-full object-contain drop-shadow-md transition-all duration-700 ease-out group-hover:drop-shadow-lg"
          />
        </div>

        {/* Date - Enhanced for desktop */}
        <div 
          className="mt-2 sm:mt-6 lg:mt-8 xl:mt-10 border-y-2 lg:border-y-[3px] border-gray-300 py-2 sm:py-3 lg:py-4 xl:py-5 px-6 sm:px-10 lg:px-14 xl:px-16 animate-fade-in-up bg-gradient-to-r from-white/40 via-white/50 to-white/40 backdrop-blur-sm transition-all duration-500 ease-out hover:scale-105 lg:hover:scale-110 hover:bg-gradient-to-r hover:from-gold/10 hover:via-white/60 hover:to-gold/10 hover:border-gold/40 hover:shadow-md hover:shadow-gold/10 cursor-default group/date"
          style={{ animationDelay: '0.9s' }}
        >
          <span className="font-serif text-base sm:text-2xl lg:text-3xl xl:text-4xl tracking-[0.3em] lg:tracking-[0.4em] font-semibold text-gray-800 uppercase transition-all duration-300 group-hover/date:text-ink group-hover/date:tracking-[0.35em] lg:group-hover/date:tracking-[0.45em]">
            {details.date}
          </span>
        </div>

        {/* Divider / Intro - Enhanced spacing */}
        <p 
          className="mt-4 sm:mt-8 lg:mt-10 xl:mt-12 font-body uppercase tracking-[0.2em] lg:tracking-[0.25em] text-[10px] sm:text-sm lg:text-base xl:text-lg text-gray-500 animate-fade-in-up transition-all duration-500 hover:text-gold hover:tracking-[0.25em] lg:hover:tracking-[0.3em] cursor-default"
          style={{ animationDelay: '1.1s' }}
        >
          For the wedding of
        </p>

        {/* Names - SUPER SIZED & STACKED - Enhanced for desktop */}
        <div 
          className="mt-6 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16 font-script text-ink flex flex-col items-center leading-none animate-fade-in-up drop-shadow-lg group cursor-default"
          style={{ animationDelay: '1.3s' }}
        >
          <span className="text-[3.5rem] sm:text-[6rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem] transition-all duration-700 ease-in-out group-hover:-translate-y-4 lg:group-hover:-translate-y-6 group-hover:scale-[1.02] lg:group-hover:scale-[1.03] group-hover:text-ink/90 group-hover:drop-shadow-xl">{details.groom}</span>
          <span className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gold font-serif italic my-[-8px] sm:my-[-16px] md:my-[-20px] lg:my-[-24px] xl:my-[-28px] z-10 transition-all duration-500 ease-in-out group-hover:rotate-12 lg:group-hover:rotate-15 group-hover:scale-125 lg:group-hover:scale-135 group-hover:text-gold/80 group-hover:drop-shadow-md">&</span>
          <span className="text-[3.5rem] sm:text-[6rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem] transition-all duration-700 ease-in-out group-hover:translate-y-4 lg:group-hover:translate-y-6 group-hover:scale-[1.02] lg:group-hover:scale-[1.03] group-hover:text-ink/90 group-hover:drop-shadow-xl">{details.bride}</span>
        </div>

        {/* Location Text - Enhanced for desktop */}
         <p 
            className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 font-serif uppercase tracking-widest lg:tracking-[0.2em] text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 animate-fade-in-up transition-all duration-700 ease-out hover:tracking-[0.25em] lg:hover:tracking-[0.3em] hover:text-ink hover:font-semibold cursor-default"
            style={{ animationDelay: '1.5s' }}
          >
            {details.location}
          </p>
      </div>

      {/* Footer Section: RSVP & Stats - Enhanced layout for desktop */}
      <div className="mt-2 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 w-full max-w-sm lg:max-w-md xl:max-w-lg text-center z-30 mb-4 sm:mb-0 lg:mb-4">
         <div className="animate-fade-in-up group flex flex-col items-center" style={{ animationDelay: '1.7s' }}>
            <p className="font-body italic text-gray-600 mb-2 sm:mb-3 lg:mb-4 xl:mb-5 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl transition-colors duration-500 group-hover:text-gray-800">To board with us, please confirm your seats</p>
            <div className="font-serif text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg tracking-wider text-gray-800 mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 transition-all duration-300 hover:scale-105 lg:hover:scale-110 cursor-pointer hover:text-gold hover:font-semibold px-2 py-1 lg:px-3 lg:py-2 rounded hover:bg-gold/5">
              {details.rsvpContact}
            </div>
            
            <button 
              onClick={onRSVP}
              className="relative bg-gradient-to-br from-ink via-ink to-gray-800 text-paper font-serif uppercase tracking-[0.2em] lg:tracking-[0.25em] text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg py-3 sm:py-3.5 md:py-4 lg:py-5 xl:py-6 px-8 sm:px-10 md:px-12 lg:px-16 xl:px-20 rounded-sm hover:from-gold hover:via-gold/90 hover:to-gold transition-all duration-500 shadow-lg shadow-ink/20 hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-1 lg:hover:-translate-y-2 active:translate-y-0 active:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-paper overflow-hidden group/btn"
              aria-label="Confirm your seat for the wedding"
            >
              <span className="relative z-10 flex items-center gap-2 lg:gap-3">
                <span>Confirm Seat</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 transition-transform duration-300 group-hover/btn:translate-x-1 lg:group-hover/btn:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></span>
            </button>

            {/* Guest Counter - Enhanced for desktop */}
            {guestCount !== null && (
              <button 
                onClick={onViewGuestBook}
                className="mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8 flex items-center gap-2 lg:gap-3 text-gray-500 hover:text-gold transition-all duration-300 text-xs sm:text-sm lg:text-base xl:text-lg group/counter focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-paper rounded px-2 py-1 lg:px-3 lg:py-2"
                aria-label={`View guest book with ${guestCount} confirmed guests`}
              >
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 transition-transform duration-300 group-hover/counter:scale-110 lg:group-hover/counter:scale-125" />
                <span className="font-serif tracking-widest lg:tracking-[0.15em] border-b border-transparent group-hover/counter:border-gold pb-0.5 lg:pb-1 transition-all duration-300">
                  {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'} Confirmed
                </span>
              </button>
            )}
         </div>
      </div>
    </div>
  );
};

export default InvitationCard;