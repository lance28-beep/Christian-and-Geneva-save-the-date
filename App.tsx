import React, { useState, useEffect } from 'react';
import WorldMap from './components/WorldMap';
import InvitationCard from './components/InvitationCard';
import LoadingList from './components/LoadingList';
import RSVPModal from './components/RSVPModal';
import GuestBookModal from './components/GuestBookModal';
import BackgroundMusic from './components/BackgroundMusic';
import Layout from './components/Layout';
import { InvitationDetails } from './types';

const details: InvitationDetails = {
  groom: "Christian",
  bride: "Geneva",
  date: "March 2027",
  location: "Palawan, Philippines",
  rsvpContact: "0426572257 | 0491174764"
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showRSVP, setShowRSVP] = useState(false);
  const [showGuestBook, setShowGuestBook] = useState(false);
  const [guestCount, setGuestCount] = useState<number | null>(null);

  // Fetch guest count for the "countdown/counter" on the main card
  const fetchGuestCount = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwDIw5Nz6uRTx7vMF2oVX5INlZFYzQ42SO9dR7H6NehgoJfvouRI0kz8CYRE0suyytZ/exec",
        { cache: "no-store" }
      );
      if (response.ok) {
        const data = await response.json();
        if (data && data.GoogleSheetData && Array.isArray(data.GoogleSheetData)) {
            // Skip header row
            const rows = data.GoogleSheetData.slice(1);
            // Sum up the guests column (index 3 based on BookOfGuests logic)
            // Header: Timestamp, Full Name, Email, Number Of Guests, Message
            const count = rows.reduce((sum: number, row: string[]) => {
                const guests = parseInt(row[3] || "0");
                return sum + (isNaN(guests) ? 0 : guests);
            }, 0);
            setGuestCount(count);
        }
      }
    } catch (e) {
      console.error("Failed to fetch count", e);
    }
  };

  useEffect(() => {
    fetchGuestCount();
    
    // Listen for updates from RSVP modal to refresh count
    const handleRsvpUpdate = () => {
        setTimeout(fetchGuestCount, 2000); 
    };
    window.addEventListener("rsvpUpdated", handleRsvpUpdate);
    return () => window.removeEventListener("rsvpUpdated", handleRsvpUpdate);
  }, []);

  return (
    <Layout>
      {/* h-[100dvh] ensures it fits the dynamic viewport height on mobile browsers, eliminating scroll */}
      <div className="relative w-full h-[100dvh] bg-paper overflow-hidden selection:bg-gold selection:text-white flex flex-col items-center justify-center">
      {/* Visual noise/grain overlay for paper texture effect */}
      <div className="noise-overlay"></div>
      
      {loading ? (
        <LoadingList onComplete={() => setLoading(false)} />
      ) : (
        <>
          {/* Background Map - Philippines */}
          {/* On Desktop: We position it more intentionally to ensure it's visible around the card */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
             <WorldMap className="w-full h-full opacity-100 text-[#d6cfc2] scale-100 md:scale-90" />
          </div>

          {/* Main Container */}
          <main className="relative z-10 w-full h-full flex flex-col justify-center items-center p-4 sm:p-6 md:p-12 lg:p-24">
            {/* Card Container:
                - Mobile: Standard sizing
                - Desktop: Wider max-width, slightly more padding to let the design breathe
            */}
            <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl bg-white/40 backdrop-blur-md shadow-xl shadow-stone-200/50 rounded-xl p-4 sm:p-12 md:p-16 border border-white/50 transition-all duration-1000 animate-fade-in-up flex flex-col items-center justify-center min-h-[500px] md:min-h-[700px]">
               <InvitationCard 
                 details={details} 
                 onRSVP={() => setShowRSVP(true)} 
                 guestCount={guestCount}
                 onViewGuestBook={() => {}}
               />
            </div>
          </main>
          
          {/* Decorative corners - Larger on desktop */}
          <div className="fixed top-0 left-0 w-24 h-24 sm:w-40 sm:h-40 md:w-64 md:h-64 bg-gradient-to-br from-white via-white/50 to-transparent pointer-events-none"></div>
          <div className="fixed bottom-0 right-0 w-24 h-24 sm:w-40 sm:h-40 md:w-64 md:h-64 bg-gradient-to-tl from-stone-100 via-stone-50/50 to-transparent pointer-events-none"></div>

          {/* Modals Layer */}
          <RSVPModal isOpen={showRSVP} onClose={() => setShowRSVP(false)} />
          <GuestBookModal isOpen={showGuestBook} onClose={() => setShowGuestBook(false)} />
          
          {/* Background Music */}
          <BackgroundMusic />
        </>
      )}
      </div>
    </Layout>
  );
};

export default App;