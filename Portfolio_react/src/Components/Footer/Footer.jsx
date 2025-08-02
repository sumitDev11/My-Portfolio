import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import videoWebM from '../../assets/video/Rainbow_Nebula_4K_Motion_Background.webm';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const aboutRef = useRef(null);
  const linksRef = useRef(null);
  const socialsRef = useRef(null);
  const contactRef = useRef(null);
  const bottomRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const observer = new IntersectionObserver( (entries) => { if (entries[0].isIntersecting && !isVisible) { setIsVisible(true); animateFooterElements(); } }, { threshold: 0.1 } );
    if (footerRef.current) { observer.observe(footerRef.current); }
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const footerTop = footerRef.current?.offsetTop || 0;
      const footerHeight = footerRef.current?.offsetHeight || 0;
      const windowHeight = window.innerHeight;
      if (scrolled + windowHeight > footerTop && scrolled < footerTop + footerHeight) {
        const parallaxValue = (scrolled - footerTop) * 0.15;
        if (videoRef.current) { videoRef.current.style.transform = `translateY(${parallaxValue}px)`; }
      }
    };
    const handleMouseMove = (e) => {
      if (isMobile) return;
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;
      if (contentRef.current) {
        const x = deltaX * 0.4;
        const y = deltaY * 0.4;
        contentRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, [isVisible]);

  const animateFooterElements = () => {
    const isMobile = window.innerWidth <= 768;
    gsap.fromTo( contentRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: isMobile ? 0.7 : 1, ease: "power3.out", delay: 0.2, } );
    gsap.fromTo( [aboutRef.current, linksRef.current, socialsRef.current, contactRef.current], { opacity: 0, y: 30, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: isMobile ? 0.7 : 0.9, stagger: 0.1, ease: "back.out(1.5)", delay: 0.3, } );
    gsap.fromTo( socialsRef.current.querySelectorAll(".social-icon"), { opacity: 0, scale: 0.7, rotation: -90 }, { opacity: 1, scale: 1, rotation: 0, duration: isMobile ? 0.5 : 0.7, stagger: 0.08, ease: "elastic.out(1, 0.6)", delay: 0.6, } );
    gsap.fromTo( bottomRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: isMobile ? 0.5 : 0.7, ease: "power2.out", delay: 0.8, } );
    gsap.to(".floating-particle", { y: "random(-15, 15)", x: "random(-8, 8)", rotation: "random(-180, 180)", duration: "random(2.5, 5)", repeat: -1, yoyo: true, ease: "sine.inOut", stagger: { amount: 1.5, from: "random" } });
  };


  const footerSections = [
    {
      ref: aboutRef,
      title: "About Me",
      gradient: "linear-gradient(135deg, #6366f1, #a855f7)",
      content: (
        <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>
          I'm a passionate full-stack web developer focused on creating seamless, responsive, and innovative digital solutions. Let's bring your vision to life!
        </p>
      ),
    },
    {
      ref: linksRef,
      title: "Quick Links",
      gradient: "linear-gradient(135deg, #a855f7, #ec4899)",
      content: (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[ { key: 'Hero', label: 'Home' }, { key: 'About', label: 'About' }, { key: 'Toolbox', label: 'Toolbox' }, { key: 'NewAbout', label: 'Services' }, { key: 'Projects', label: 'Projects' }, ].map((link) => (
            <li key={link.key}>
              <a href={`#${link.key}`} style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s ease', display: 'inline-block', position: 'relative' }} onMouseEnter={(e) => { e.target.style.color = '#6366f1'; e.target.style.transform = 'translateX(4px)'; }} onMouseLeave={(e) => { e.target.style.color = '#d1d5db'; e.target.style.transform = 'translateX(0)'; }} >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ),
    },
    {
      ref: socialsRef,
      title: "Follow Me",
      gradient: "linear-gradient(135deg, #ec4899, #f59e0b)",
      content: (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {[ { icon: FaGithub, url: 'https://github.com/sumitDev11', color: '#6366f1' }, { icon: FaLinkedin, url: 'https://www.linkedin.com/in/sumit-kumar-64484a2b2/', color: '#0077b5' }, { icon: FaTwitter, url: 'https://x.com/AIDev_Sumit', color: '#1da1f2' }, { icon: FaEnvelope, url: 'mailto:sumitkumar112206@gmail.com', color: '#ef4444' }, ].map((social) => {
            const Icon = social.icon;
            return (
              <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer" className="social-icon" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(8px)' }} onMouseEnter={(e) => { e.target.style.background = social.color; e.target.style.transform = 'translateY(-4px) scale(1.05)'; e.target.style.boxShadow = `0 8px 20px ${social.color}30`; }} onMouseLeave={(e) => { e.target.style.background = 'rgba(255, 255, 255, 0.08)'; e.target.style.transform = 'translateY(0) scale(1)'; e.target.style.boxShadow = 'none'; }} >
                <Icon size={18} color="#ffffff" />
              </a>
            );
          })}
        </div>
      ),
    },
    {
      ref: contactRef,
      title: "Get In Touch",
      gradient: "linear-gradient(135deg, #10b981, #6366f1)",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><FaEnvelope size={16} color="#6366f1" /><span style={{ color: '#d1d5db', fontSize: '0.95rem' }}>sumitkumar112206@gmail.com</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><FaPhone size={16} color="#a855f7" /><span style={{ color: '#d1d5db', fontSize: '0.95rem' }}>+91 9971419630</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><FaMapMarkerAlt size={16} color="#ec4899" /><span style={{ color: '#d1d5db', fontSize: '0.95rem' }}>Delhi-110059, India</span></div>
        </div>
      ),
    },
  ];

  return (
    <footer 
      className="footer" 
      ref={footerRef} 
      role="contentinfo" 
      aria-label="Footer"
      style={{
        position: 'relative', minHeight: '70vh', width: '100%', overflow: 'hidden', background: '#0a0a0a', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 0',
      }}
    >
      <div className="video-background" style={{ position: 'absolute', top: '-5%', left: '-5%', width: '110%', height: '110%', zIndex: 1, }}> <video ref={videoRef} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75) contrast(1.15) hue-rotate(220deg)', }}> <source src={videoWebM} type="video/webm" /> </video> </div>
      <div ref={overlayRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `radial-gradient(circle at 25% 15%, rgba(99, 102, 241, 0.15) 0%, transparent 55%), radial-gradient(circle at 75% 85%, rgba(168, 85, 247, 0.15) 0%, transparent 55%), radial-gradient(circle at 15% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 55%), linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.95) 100%)`, zIndex: 2, }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)`, backgroundSize: '30px 30px', zIndex: 2, animation: 'gridMove 25s linear infinite', }} />
      {[...Array(6)].map((_, i) => (<div key={i} className="floating-particle" style={{ position: 'absolute', width: `${6 + i * 3}px`, height: `${6 + i * 3}px`, borderRadius: '50%', background: `linear-gradient(45deg, ${['#6366f1', '#a855f7', '#10b981', '#f59e0b', '#ef4444'][i % 5]}, transparent)`, opacity: 0.12, top: `${10 + i * 15}%`, left: `${10 + i * 15}%`, zIndex: 2, }} /> ))}

      <div 
        className="footer-content"
        ref={contentRef}
        style={{ position: 'relative', zIndex: 3, maxWidth: '1280px', width: '90%', margin: '0 auto', padding: '2.5rem 1rem', }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem', }}>
          
          {footerSections.map((section) => (
            <div
              key={section.title}
              className="footer-section"
              ref={section.ref}
              style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(12px)', willChange: 'transform, box-shadow, border-color' }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { y: -8, scale: 1.02, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)", borderColor: "rgba(99, 102, 241, 0.4)", duration: 0.3, ease: "power2.out", });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { y: 0, scale: 1, boxShadow: "none", borderColor: "rgba(255, 255, 255, 0.08)", duration: 0.3, ease: "power2.out", });
              }}
            >
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', }}>
                <span style={{ width: '6px', height: '6px', background: section.gradient, borderRadius: '50%', display: 'inline-block', }}></span>
                {section.title}
              </h4>
              {section.content}
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div 
          className="footer-bottom"
          ref={bottomRef}
          style={{
            textAlign: 'center',
            padding: '1.5rem 0',
            border: '1px solid rgba(255, 255, 255, 0.08)', 
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
            willChange: 'transform, box-shadow, border-color',
          }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              y: -8,
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)",
              borderColor: "rgba(99, 102, 241, 0.4)",
              duration: 0.3,
              ease: "power2.out",
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              y: 0,
              scale: 1,
              boxShadow: "none",
              borderColor: "rgba(255, 255, 255, 0.08)",
              duration: 0.3,
              ease: "power2.out",
            });
          }}
        >
          <p style={{
            fontSize: '0.9rem',
            color: '#9ca3af',
            margin: 0,
            fontWeight: '400',
          }}>
            © {new Date().getFullYear()} Sumit Kumar. All rights reserved.
            <span style={{
              display: 'block',
              marginTop: '0.5rem',
              fontSize: '0.8rem',
              color: '#6b7280',
            }}>
              Crafted with ❤️ using modern web technologies
            </span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30px, 30px); }
        }
        
        @media (max-width: 1024px) {
          .footer-content { padding: 2rem 1rem !important; }
          .footer-content > div { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)) !important; gap: 1.5rem !important; }
          .footer-section { padding: 1.25rem !important; }
        }
        @media (max-width: 768px) {
          .footer { min-height: auto !important; padding: 1.5rem 0 !important; }
          .footer-content { width: 95% !important; padding: 1.5rem 0.75rem !important; }
          .footer-content > div { grid-template-columns: 1fr !important; gap: 1.25rem !important; }
          .footer-section { padding: 1.25rem !important; text-align: center; }
          .footer-section h4 { justify-content: center; font-size: 1.1rem !important; }
          .footer-section ul { align-items: center; }
          .footer-section .social-icon { width: 36px !important; height: 36px !important; }
          .footer-section .social-icon svg { width: 16px !important; height: 16px !important; }
          .footer-bottom { padding: 1rem 0 !important; }
          .floating-particle { display: none; }
        }
        @media (max-width: 480px) {
          .footer-content { padding: 1rem 0.5rem !important; }
          .footer-section { padding: 1rem !important; }
          .footer-section h4 { font-size: 1rem !important; }
          .footer-section p, .footer-section span { font-size: 0.85rem !important; }
          .footer-bottom p { font-size: 0.8rem !important; }
          .footer-bottom span { font-size: 0.75rem !important; }
        }
        @media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }
      `}</style>
    </footer>
  );
};

export default Footer;