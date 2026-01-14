import React, { useState, useEffect, useRef } from 'react';
import { Heart, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const RSVPModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle animation timing for unmounting
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const guests = formData.get("guests") as string;
    const message = formData.get("message") as string;

    // Google Forms integration
    const googleFormData = new FormData();
    googleFormData.append("entry.405401269", name);
    googleFormData.append("entry.1755234596", email);
    googleFormData.append("entry.1335956832", guests);
    googleFormData.append("entry.893740636", message);

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSe00CoRNGeGqX6cRJGU7R1NPE8Rl0skhwgtlg8NGyMLl2GkAA/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      );

      formRef.current?.reset();
      // Dispatch event for GuestBook to update
      window.dispatchEvent(new Event("rsvpUpdated"));

      setIsSubmitting(false);
      setStep('success');
    } catch (error) {
      setIsSubmitting(false);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after animation finishes
    setTimeout(() => {
      setStep('form');
      setError(null);
    }, 300);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className={`relative bg-paper w-full max-w-md rounded-lg shadow-2xl p-4 sm:p-6 md:p-10 border border-white/50 transform transition-all duration-500 ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}>
        {/* Decorative corner texture */}
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-bl from-gold/10 to-transparent rounded-tr-lg pointer-events-none"></div>

        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gold transition-colors z-10"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {step === 'form' ? (
          <div className="animate-fade-in-up" style={{ animationDuration: '0.5s' }}>
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-ink mb-1 sm:mb-2">You're Invited!</h2>
              <p className="font-body text-gray-600 italic text-sm sm:text-base md:text-lg">Hello you are invited to our wedding!</p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
              <div className="group">
                <label className="block font-serif text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 mb-0.5 sm:mb-1 transition-colors group-focus-within:text-gold">Full Name *</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  placeholder="Enter your full name"
                  className="w-full bg-stone-50/50 border-b border-gray-300 py-1.5 sm:py-2 px-1 font-body text-sm sm:text-base md:text-xl placeholder:text-gray-300 focus:outline-none focus:border-gold focus:bg-white transition-all"
                />
              </div>

              <div className="group">
                <label className="block font-serif text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 mb-0.5 sm:mb-1 transition-colors group-focus-within:text-gold">Email Address *</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="Enter your email address"
                  className="w-full bg-stone-50/50 border-b border-gray-300 py-1.5 sm:py-2 px-1 font-body text-sm sm:text-base md:text-xl placeholder:text-gray-300 focus:outline-none focus:border-gold focus:bg-white transition-all"
                />
              </div>

               <div className="group">
                <label className="block font-serif text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 mb-0.5 sm:mb-1 transition-colors group-focus-within:text-gold">Number of Guests *</label>
                <div className="relative">
                  <select 
                    required
                    name="guests"
                    className="w-full bg-stone-50/50 border-b border-gray-300 py-1.5 sm:py-2 px-1 font-body text-sm sm:text-base md:text-xl focus:outline-none focus:border-gold focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                     <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block font-serif text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 mb-0.5 sm:mb-1 transition-colors group-focus-within:text-gold">Message (Optional)</label>
                <textarea 
                  name="message"
                  placeholder="Share Your Excitement"
                  rows={2}
                  className="w-full bg-stone-50/50 border-b border-gray-300 py-1.5 sm:py-2 px-1 font-body text-sm sm:text-base md:text-xl placeholder:text-gray-300 focus:outline-none focus:border-gold focus:bg-white transition-all resize-none"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 bg-red-50 p-2 sm:p-3 rounded-sm border border-red-100">
                  <AlertCircle size={14} className="sm:w-4 sm:h-4" />
                  <span className="font-body text-xs sm:text-sm">{error}</span>
                </div>
              )}

              <div className="pt-2 sm:pt-3 md:pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-ink text-paper font-serif uppercase tracking-[0.2em] text-xs sm:text-sm py-2.5 sm:py-3 md:py-4 rounded-sm hover:bg-gold hover:shadow-xl transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 sm:gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                      Submit RSVP
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 sm:py-8 md:py-10 animate-fade-in-up flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-green-50 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 text-green-600 border border-green-100">
               <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-ink mb-3 sm:mb-4 md:mb-6">RSVP Sent!</h3>
            <div className="font-body text-sm sm:text-base md:text-xl text-gray-600 space-y-1.5 sm:space-y-2 max-w-xs mx-auto leading-relaxed">
              <p>
                Your attendance will be reported and be reflected to our guestbook.
              </p>
              <p className="pt-1 sm:pt-2">
                We are excited to see you.<br/>Thanks for confirming.
              </p>
            </div>
            <button 
              onClick={handleClose}
              className="mt-6 sm:mt-8 md:mt-10 text-gold font-serif uppercase tracking-widest text-[10px] sm:text-xs border-b border-transparent hover:border-gold transition-all"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default RSVPModal;