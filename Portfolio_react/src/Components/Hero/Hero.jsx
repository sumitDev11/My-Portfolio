import React, { useEffect, useRef, useState, useCallback } from 'react';
import videoWebM from '../../assets/video/Rainbow_Nebula_4K_Motion_Background.webm';

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionRef = useRef(null);
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    let timeout;
    const debouncedResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(checkMobile, 100);
    };
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  //====== SOLUTION: JAVASCRIPT TO FIX THE MOBILE VH PROBLEM ======//
  useEffect(() => {
    const setVisualHeight = () => {
      // Get the actual inner height of the window (the visible part)
      const vh = window.innerHeight * 0.01;
      // Set this value as a CSS custom property on the root element
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Run the function on initial load
    setVisualHeight();

    // Add a listener to re-run the function on resize (e.g., orientation change)
    window.addEventListener('resize', setVisualHeight);
    
    // Cleanup the listener when the component unmounts
    return () => window.removeEventListener('resize', setVisualHeight);
  }, []);
  //==============================================================

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    [contentRef, titleRef, descriptionRef, actionRef].forEach((ref, index) => {
      if (ref.current) {
        ref.current.style.transitionDelay = `${index * 0.2}s`;
        ref.current.classList.add('animate-in');
      }
    });
  }, [isLoaded]);

  const handleScroll = useCallback(() => {
    if (isMobile || !videoRef.current) return;
    videoRef.current.style.transform = `translate(-50%, -50%) translateY(${window.pageYOffset * 0.2}px)`;
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, isMobile]);

  return (
    <div
      id="Hero"
      ref={heroRef}
      style={{
        position: 'relative',
        width: '100%',
        //====== SOLUTION: USE THE NEW CSS VARIABLE FOR HEIGHT ======//
        // This calculates 100 * our new '--vh' unit, which is the true visible height.
        // The '100vh' is a fallback for browsers before the JS runs.
        height: 'calc(var(--vh, 1vh) * 100)',
        minHeight: '600px', // Keep min-height as a safeguard
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
      }}
      role="banner"
      aria-label="Hero section"
    >
      {/* All other elements are unchanged and will work correctly with this fix */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
        <video ref={videoRef} autoPlay loop muted playsInline preload="metadata" loading="lazy" style={{ width: isMobile ? '100%' : '120%', height: isMobile ? '100%' : '120%', objectFit: 'cover', filter: `brightness(${isMobile ? 0.4 : 0.3}) contrast(1.1)`, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', willChange: isMobile ? 'auto' : 'transform' }} aria-hidden="true">
          <source src={videoWebM} type="video/webm" />
          <track kind="captions" srcLang="en" label="Background video" />
        </video>
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 100%)', zIndex: 1 }} aria-hidden="true" />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `linear-gradient(rgba(99, 102, 241, ${isMobile ? 0.03 : 0.08}) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, ${isMobile ? 0.03 : 0.08}) 1px, transparent 1px)`, backgroundSize: isMobile ? '30px 30px' : '40px 40px', zIndex: 2, animation: isMobile ? 'none' : 'gridMove 20s linear infinite' }} aria-hidden="true" />
      <div ref={contentRef} style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: isMobile ? '0 1rem' : '0 2rem', maxWidth: '1000px', width: '100%', opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
        <h1 ref={titleRef} style={{ fontSize: isMobile ? 'clamp(1.8rem, 7vw, 2.8rem)' : 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700, color: '#ffffff', marginBottom: isMobile ? '0.8rem' : '1.2rem', opacity: 0, transform: 'translateY(15px)', transition: 'opacity 0.6s ease, transform 0.6s ease', lineHeight: 1.2 }} role="heading" aria-level="1">
          <span style={{ display: 'block', marginBottom: isMobile ? '0.4rem' : '0.8rem' }}>Hello, I'm <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>Sumit Kumar</span></span>
          <span style={{ fontSize: isMobile ? 'clamp(1rem, 5vw, 1.6rem)' : 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 400, color: '#e5e7eb', display: 'block' }}>Full-Stack Developer from India</span>
        </h1>
        <p ref={descriptionRef} style={{ fontSize: isMobile ? 'clamp(0.9rem, 3.5vw, 1rem)' : 'clamp(1rem, 1.8vw, 1.15rem)', color: '#d1d5db', maxWidth: isMobile ? '100%' : '550px', lineHeight: 1.6, marginBottom: isMobile ? '1.5rem' : '2rem', opacity: 0, transform: 'translateY(15px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>Building seamless, scalable, and user-centric digital experiences through innovation and cutting-edge technology.</p>
       <div
  ref={actionRef}
  style={{
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '0.8rem' : '1.2rem',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    opacity: 0,
    transform: 'translateY(15px)',
    transition: 'opacity 0.6s ease, transform 0.6s ease',
  }}
>
  {/* === "CONNECT WITH ME" BUTTON === */}
  <a
    href="#Contact"
    style={{
      padding: isMobile ? '0.75rem 1.5rem' : '0.9rem 1.8rem', // Slightly increased horizontal padding for a better look
      fontSize: isMobile ? '0.95rem' : '1rem',
      fontWeight: 600,
      color: '#ffffff',
      textDecoration: 'none',
      // SOLUTION 1: Update the gradient to be left-to-right (90deg)
      background: 'linear-gradient(90deg, #6366f1, #a855f7)',
      borderRadius: '9999px',
      boxShadow: '0 8px 20px rgba(99, 102, 241, 0.2)',
      textAlign: 'center',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      // SOLUTION 2: Remove the fixed width. The button will now fit its content.
      width: 'auto', 
      boxSizing: 'border-box',
    }}
    onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 25px rgba(99, 102, 241, 0.3)'; }}
    onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.2)'; }}
    aria-label="Connect with me"
  >
    Connect with me
  </a>

  {/* === "DOWNLOAD RESUME" BUTTON (Applying the same fix for consistency) === */}
  <a
    href="/Sumit Kumar Resume.pdf"
    download
    style={{
      padding: isMobile ? '0.7rem 1rem' : '0.9rem 1.8rem',
      fontSize: isMobile ? '0.95rem' : '1rem',
      fontWeight: 600,
      color: '#ffffff',
      textDecoration: 'none',
      background: 'rgba(255, 255, 255, 0.08)',
      border: '2px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '9999px',
      textAlign: 'center',
      transition: 'transform 0.2s ease, background 0.2s ease, border-color 0.2s ease',
      // SOLUTION 2: Remove the fixed width here as well.
      width: 'auto',
      boxSizing: 'border-box',
    }}
    onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.background = 'rgba(255, 255, 255, 0.15)'; e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }}
    onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.background = 'rgba(255, 255, 255, 0.08)'; e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)'; }}
    aria-label="Download my resume"
  >
    Download Resume
  </a>
</div>
      </div>
      {!isMobile && (<div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 3, color: '#ffffff', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', opacity: 0.6, transition: 'opacity 0.3s ease' }} aria-hidden="true"><span>Scroll to explore</span><div style={{ width: '2px', height: '25px', background: 'linear-gradient(to bottom, #6366f1, transparent)', borderRadius: '2px' }} /></div>)}
      <style>{`@keyframes gridMove { 0% { transform: translate(0, 0); } 100% { transform: translate(40px, 40px); } } .animate-in { opacity: 1 !important; transform: translateY(0) !important; } @media (max-width: 768px) { a { min-height: 44px; } } @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } } @media (prefers-contrast: high) { h1 { text-shadow: none !important; } a { border-width: 3px !important; } } a:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }`}</style>
    </div>
  );
};

export default Hero;