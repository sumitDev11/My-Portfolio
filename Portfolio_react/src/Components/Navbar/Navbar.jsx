import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, User, Briefcase, Mail, Settings, Wrench } from 'lucide-react';

const Navbar = () => {
  // --- STATE MANAGEMENT ---
  const [activeSection, setActiveSection] = useState('Hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Ref to prevent scroll highlighting immediately after a click
  const clickTimeoutRef = useRef(null);

  // --- MENU ITEMS ---
  const menuItems = [
    { key: 'Hero', label: 'Home', icon: Home },
    { key: 'About', label: 'About', icon: User },
    { key: 'Toolbox', label: 'Toolbox', icon: Wrench },
    { key: 'NewAbout', label: 'Services', icon: Settings },
    { key: 'Projects', label: 'Projects', icon: Briefcase },
  ];

  // --- EFFECT: HANDLE SCROLLING BEHAVIOR ---
  useEffect(() => {
    // Throttling flag to prevent running on every scroll event
    let scrollTicking = false;

    const handleScroll = () => {
      // 1. Update background style based on scroll position
      setIsScrolled(window.pageYOffset > 50);

      // 2. Update active menu item based on scroll position (Scroll-Spy)
      if (scrollTicking) return; // If waiting for animation frame, do nothing

      scrollTicking = true;
      requestAnimationFrame(() => {
        // If user just clicked, don't update from scroll for a moment
        if (clickTimeoutRef.current) {
          scrollTicking = false;
          return;
        }
        
        // Find the section that is closest to the top of the viewport
        let currentSection = '';
        for (const item of menuItems) {
          const element = document.getElementById(item.key);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Check if the section is in the top 60% of the viewport
            if (rect.top >= 0 && rect.top <= window.innerHeight * 0.6) {
              currentSection = item.key;
              break;
            }
          }
        }
        
        if (currentSection) {
          setActiveSection(currentSection);
        }
        scrollTicking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems]); // Re-run if menuItems change

  // --- EFFECT: LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN ---
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);
  
  // --- FUNCTION: HANDLE MENU ITEM CLICKS ---
  const handleMenuItemClick = (sectionKey) => {
    // Temporarily disable scroll-based highlighting
    clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      clickTimeoutRef.current = null;
    }, 1000); // Stop scroll-spy for 1 second

    // Set active section immediately for responsive feel
    setActiveSection(sectionKey);
    setMobileMenuOpen(false);

    // Scroll to the section smoothly
    const element = document.getElementById(sectionKey);
    if (element) {
      const offset = 80; // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  // --- HELPER FUNCTION FOR CLASSNAMES ---
  // This replaces the 'clsx' package.
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  // --- JSX RENDER ---
  return (
    <>
      <nav className={classNames('navbar', isScrolled && 'scrolled')}>
        <div className="navbar-container">
          <div className="navbar-logo" onClick={() => handleMenuItemClick('Hero')}>
            <div className="logo-icon">S</div>
            <span className="logo-text">Sumit Kumar</span>
          </div>

          <ul className="desktop-menu">
            {menuItems.map((item) => (
              <li key={item.key}>
                <a
                  href={`#${item.key}`}
                  className={classNames('menu-link', activeSection === item.key && 'active')}
                  onClick={(e) => { e.preventDefault(); handleMenuItemClick(item.key); }}
                >
                  <item.icon size={14} /> {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="desktop-action">
            <a href="#Contact" className="action-button" onClick={(e) => { e.preventDefault(); handleMenuItemClick('Contact'); }}>
              <Mail size={14} /> Connect
            </a>
          </div>

          <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div className={classNames('mobile-menu-overlay', mobileMenuOpen && 'open')} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          {menuItems.map((item) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              className={classNames('menu-link', activeSection === item.key && 'active')}
              onClick={(e) => { e.preventDefault(); handleMenuItemClick(item.key); }}
            >
              <item.icon size={16} /> {item.label}
            </a>
          ))}
          <a href="#Contact" className="action-button mobile" onClick={(e) => { e.preventDefault(); handleMenuItemClick('Contact'); }}>
            <Mail size={16} /> Connect with me
          </a>
        </div>
      </div>

      {/* 
        THE CSS IS NOW INSIDE A STANDARD <STYLE> TAG.
        THIS WILL NOT CAUSE ANY CONSOLE ERRORS.
      */}
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 0.75rem 1.5rem;
          background: transparent;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border-bottom: 1px solid transparent;
          transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
          will-change: background, border-color;
        }
        .navbar.scrolled {
          background: rgba(10, 10, 25, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom-color: rgba(255, 255, 255, 0.08);
        }
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.3rem;
          font-weight: 700;
          cursor: pointer;
          user-select: none;
        }
        .logo-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: linear-gradient(135deg, #7c3aed, #db2777);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: #fff;
        }
        .logo-text {
          color: #fff;
        }
        .desktop-menu {
          display: flex;
          gap: 1rem;
          list-style: none;
          margin: 0; padding: 0;
        }
        .menu-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          color: #d1d5db;
          background: transparent;
          transition: all 0.2s ease;
        }
        .menu-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }
        .menu-link.active {
          color: #ffffff;
          background: linear-gradient(135deg, #7c3aed, #db2777);
        }
        .desktop-action {
          display: block;
        }
        .action-button {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1.2rem;
          border-radius: 999px;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(135deg, #7c3aed, #db2777);
          transition: transform 0.2s ease;
        }
        .action-button:hover {
          transform: scale(1.05);
        }
        .menu-toggle {
          display: none;
          background: transparent;
          border: none;
          color: #fff;
          cursor: pointer;
        }
        .mobile-menu-overlay {
          display: none;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .desktop-menu, .desktop-action {
            display: none;
          }
          .menu-toggle {
            display: block;
          }
          .mobile-menu-overlay {
            display: block;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 999;
            background: rgba(10, 10, 25, 0.5);
            backdrop-filter: blur(10px);
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
          }
          .mobile-menu-overlay.open {
            opacity: 1;
            visibility: visible;
          }
          .mobile-menu {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            position: absolute;
            top: 0; right: 0;
            padding: 1rem;
            padding-top: 5rem;
            width: 70%;
            max-width: 280px;
            height: 100%;
            background: rgba(20, 20, 40, 0.95);
            transform: translateX(100%);
            transition: transform 0.3s ease;
          }
          .mobile-menu-overlay.open .mobile-menu {
            transform: translateX(0);
          }
          .mobile-menu .menu-link,
          .mobile-menu .action-button {
            width: 100%;
            justify-content: flex-start;
            padding: 0.8rem 1rem;
          }
          .mobile-menu .action-button.mobile {
            justify-content: center;
            margin-top: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;